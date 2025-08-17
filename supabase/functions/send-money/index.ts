import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user) throw new Error("User not authenticated");

    const { recipientEmail, amount, description } = await req.json();

    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get sender's wallet
    const { data: senderWallet, error: senderError } = await supabaseService
      .from("digital_wallets")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (senderError || !senderWallet) {
      throw new Error("Sender wallet not found");
    }

    if (parseFloat(senderWallet.balance) < parseFloat(amount)) {
      throw new Error("Insufficient balance");
    }

    // Get recipient user
    const { data: recipientUser, error: recipientUserError } = await supabaseService
      .from("profiles")
      .select("id")
      .eq("email", recipientEmail)
      .single();

    if (recipientUserError || !recipientUser) {
      throw new Error("Recipient not found");
    }

    // Get recipient's wallet
    const { data: recipientWallet, error: recipientError } = await supabaseService
      .from("digital_wallets")
      .select("*")
      .eq("user_id", recipientUser.id)
      .single();

    if (recipientError || !recipientWallet) {
      throw new Error("Recipient wallet not found");
    }

    // Update sender's wallet
    const newSenderBalance = parseFloat(senderWallet.balance) - parseFloat(amount);
    await supabaseService
      .from("digital_wallets")
      .update({ 
        balance: newSenderBalance,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", user.id);

    // Update recipient's wallet
    const newRecipientBalance = parseFloat(recipientWallet.balance) + parseFloat(amount);
    await supabaseService
      .from("digital_wallets")
      .update({ 
        balance: newRecipientBalance,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", recipientUser.id);

    // Record transactions
    await supabaseService.from("transactions").insert([
      {
        user_id: user.id,
        amount: -amount,
        description: `Sent to ${recipientEmail}: ${description}`,
        transaction_type: "transfer",
        status: "completed",
      },
      {
        user_id: recipientUser.id,
        amount: amount,
        description: `Received from ${user.email}: ${description}`,
        transaction_type: "transfer",
        status: "completed",
      }
    ]);

    return new Response(JSON.stringify({ 
      success: true, 
      newBalance: newSenderBalance 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});