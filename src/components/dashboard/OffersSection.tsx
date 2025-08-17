import { ShoppingBag, Utensils, Smartphone, Shirt, Car, Gift, Clock, Star, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OffersSection = () => {
  const categories = [
    { id: "all", name: "All Offers", icon: Gift },
    { id: "food", name: "Food & Dining", icon: Utensils },
    { id: "shopping", name: "Shopping", icon: ShoppingBag },
    { id: "fashion", name: "Fashion", icon: Shirt },
    { id: "electronics", name: "Electronics", icon: Smartphone },
    { id: "travel", name: "Travel", icon: Car }
  ];

  const offers = [
    {
      id: 1,
      brand: "Flipkart",
      title: "Up to 80% Off on Electronics",
      description: "Great deals on smartphones, laptops, and gadgets",
      discount: "80% OFF",
      validUntil: "aug 31, 2025",
      category: "electronics",
      logo: "🛒",
      rating: 4.5,
      cashback: "₹500",
      featured: true
    },
    {
      id: 2,
      brand: "Zomato",
      title: "50% Off on First 3 Orders",
      description: "Delicious food delivered to your doorstep",
      discount: "50% OFF",
      validUntil: "aug 25, 2025",
      category: "food",
      logo: "🍽️",
      rating: 4.3,
      cashback: "₹150",
      featured: true
    },
    {
      id: 3,
      brand: "Myntra",
      title: "Fashion Sale - End of Season",
      description: "Trendy clothes and accessories for students",
      discount: "70% OFF",
      validUntil: "sep 5, 2025",
      category: "fashion",
      logo: "👕",
      rating: 4.4,
      cashback: "₹300"
    },
    {
      id: 4,
      brand: "Swiggy",
      title: "Free Delivery + 40% Off",
      description: "Order your favorite meals with zero delivery charges",
      discount: "40% OFF",
      validUntil: "aug 30, 2025",
      category: "food",
      logo: "🍕",
      rating: 4.2,
      cashback: "₹100"
    },
    {
      id: 5,
      brand: "Amazon",
      title: "Student Prime Benefits",
      description: "Exclusive discounts for college students",
      discount: "60% OFF",
      validUntil: "sep 31, 2025",
      category: "shopping",
      logo: "📦",
      rating: 4.6,
      cashback: "₹250"
    },
    {
      id: 6,
      brand: "BookMyShow",
      title: "Movie Tickets at ₹99",
      description: "Watch latest movies at discounted prices",
      discount: "Buy 1 Get 1",
      validUntil: "aug 28, 2025",
      category: "entertainment",
      logo: "🎬",
      rating: 4.1,
      cashback: "₹75"
    },
    {
      id: 7,
      brand: "Uber",
      title: "Student Ride Discounts",
      description: "Affordable rides for college commutes",
      discount: "25% OFF",
      validUntil: "aug 25, 2025",
      category: "travel",
      logo: "🚗",
      rating: 4.0,
      cashback: "₹50"
    },
    {
      id: 8,
      brand: "Domino's",
      title: "Buy 1 Get 1 Free Pizza",
      description: "Perfect for hostel parties and group orders",
      discount: "BOGO",
      validUntil: "aug 26, 2025",
      category: "food",
      logo: "🍕",
      rating: 4.3,
      cashback: "₹200"
    }
  ];

  const featuredOffers = offers.filter(offer => offer.featured);

  const getDiscountColor = (discount: string) => {
    if (discount.includes("80%") || discount.includes("70%")) return "bg-red-500";
    if (discount.includes("60%") || discount.includes("50%")) return "bg-orange-500";
    if (discount.includes("40%") || discount.includes("30%")) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Student Offers & Deals
          </h1>
          <p className="text-muted-foreground mt-2">
            Exclusive discounts and cashback offers for college students
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <IconComponent className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Featured Offers */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredOffers.map((offer) => (
            <Card key={offer.id} className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="absolute top-4 right-4">
                <Badge className={`${getDiscountColor(offer.discount)} text-white font-bold`}>
                  {offer.discount}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{offer.logo}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{offer.brand}</CardTitle>
                    <CardDescription className="font-medium text-foreground">
                      {offer.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{offer.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{offer.rating}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Cashback: {offer.cashback}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Valid till {offer.validUntil}
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    Claim Offer
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Offers */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Available Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{offer.logo}</span>
                    <div>
                      <CardTitle className="text-base">{offer.brand}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{offer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getDiscountColor(offer.discount)} text-white text-xs`}>
                    {offer.discount}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <h3 className="font-medium text-sm">{offer.title}</h3>
                <p className="text-xs text-muted-foreground">{offer.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {offer.cashback} cashback
                  </Badge>
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    Claim
                  </Button>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Till {offer.validUntil}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
