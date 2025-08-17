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

    const { amount, method } = await req.json();

    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get current wallet
    const { data: wallet, error: walletError } = await supabaseService
      .from("digital_wallets")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (walletError) {
      throw new Error("Wallet not found");
    }

    // Update wallet balance
    const newBalance = parseFloat(wallet.balance) + parseFloat(amount);
    
    const { error: updateError } = await supabaseService
      .from("digital_wallets")
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", user.id);

    if (updateError) {
      throw new Error("Failed to update wallet");
    }

    // Record transaction
    await supabaseService.from("transactions").insert({
      user_id: user.id,
      amount: amount,
      description: `Added money to wallet via ${method}`,
      transaction_type: "income",
      payment_method: method,
      status: "completed",
    });

    return new Response(JSON.stringify({ 
      success: true, 
      newBalance: newBalance 
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