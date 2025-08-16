import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Star, Briefcase } from "lucide-react";

const JobsSection = () => {
  const jobs = [
    {
      id: 1,
      title: "Campus Tour Guide",
      company: "University Admissions",
      location: "On Campus",
      type: "Part-time",
      pay: "₹15/hour",
      rating: 4.8,
      description: "Lead prospective students and families on campus tours. Flexible scheduling around classes.",
      requirements: ["Current student", "Good communication", "Knowledge of campus"],
      timeCommitment: "10-15 hrs/week",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Math Tutor",
      company: "Study Buddy Co.",
      location: "Remote/Campus",
      type: "Freelance",
      pay: "₹20-25/hour",
      rating: 4.9,
      description: "Help fellow students with calculus and algebra. Set your own schedule.",
      requirements: ["Math major/minor", "3.5+ GPA", "Patient teaching style"],
      timeCommitment: "5-20 hrs/week",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Coffee Shop Barista",
      company: "Campus Grounds",
      location: "2 blocks away",
      type: "Part-time",
      pay: "₹12/hour + tips",
      rating: 4.2,
      description: "Make coffee and serve customers. Student-friendly shifts available.",
      requirements: ["Customer service", "Morning availability", "Food handling cert"],
      timeCommitment: "15-25 hrs/week",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Social Media Assistant",
      company: "Local Marketing Agency",
      location: "Remote",
      type: "Freelance",
      pay: "₹18/hour",
      rating: 4.6,
      description: "Create content and manage social media accounts for small businesses.",
      requirements: ["Social media skills", "Creative writing", "Basic design knowledge"],
      timeCommitment: "8-12 hrs/week",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Library Assistant",
      company: "University Library",
      location: "On Campus",
      type: "Work-Study",
      pay: "₹13/hour",
      rating: 4.7,
      description: "Help students find resources, organize books, and maintain quiet study areas.",
      requirements: ["Work-study eligible", "Attention to detail", "Quiet work environment"],
      timeCommitment: "12-20 hrs/week",
      difficulty: "Easy"
    },
    {
      id: 6,
      title: "Food Delivery Driver",
      company: "QuickEats",
      location: "Campus Area",
      type: "Flexible",
      pay: "₹16/hour + tips",
      rating: 4.1,
      description: "Deliver food orders using your bike or car. Work when you want.",
      requirements: ["Own transportation", "Valid license", "Smartphone"],
      timeCommitment: "Flexible",
      difficulty: "Easy"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success";
      case "Medium": return "bg-warning/10 text-warning";
      case "Hard": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Work-Study": return "bg-primary/10 text-primary";
      case "Freelance": return "bg-secondary/10 text-secondary";
      case "Part-time": return "bg-accent/10 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Briefcase className="h-6 w-6 mr-2 text-primary" />
          Part-time Jobs Near You
        </h2>
        <Button variant="outline">
          Filter Jobs
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-card to-primary/5">
          <p className="text-2xl font-bold text-primary">{jobs.length}</p>
          <p className="text-sm text-muted-foreground">Available Jobs</p>
        </Card>
         <Card className="p-4 text-center bg-gradient-to-br from-card to-secondary/5">
           <p className="text-2xl font-bold text-secondary">₹12-25</p>
           <p className="text-sm text-muted-foreground">Hourly Range</p>
         </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-card to-accent/5">
          <p className="text-2xl font-bold text-accent">3</p>
          <p className="text-sm text-muted-foreground">On Campus</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-card to-success/5">
          <p className="text-2xl font-bold text-success">2</p>
          <p className="text-sm text-muted-foreground">Remote Options</p>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{job.rating}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge className={getTypeColor(job.type)}>
                  {job.type}
                </Badge>
                <Badge className={getDifficultyColor(job.difficulty)}>
                  {job.difficulty}
                </Badge>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.pay}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.timeCommitment}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{job.description}</p>

              {/* Requirements */}
              <div>
                <p className="text-sm font-medium mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-1">
                  {job.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button className="flex-1 bg-gradient-to-r from-primary to-primary-hover">
                  Apply Now
                </Button>
                <Button variant="outline">
                  Save
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsSection;