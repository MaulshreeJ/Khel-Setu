import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Platform",
      links: [
        { href: "/tests", label: "Fitness Tests" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/resources", label: "Resources" },
        { href: "/auth", label: "Get Started" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/resources", label: "Support" },
        { href: "#", label: "Careers" },
        { href: "#", label: "Press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Cookie Policy" },
        { href: "#", label: "Data Protection" },
      ],
    },
  ]

  const socialLinks = [
    { href: "#", icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { href: "#", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: "#", icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { href: "#", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { href: "#", icon: <Youtube className="h-5 w-5" />, label: "YouTube" },
  ]

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SportIndia</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              Empowering Indian athletes with AI-powered fitness assessments and world-class sports science.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@sportindia.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 1800-SPORT-IN</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>New Delhi, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest updates on new features, training tips, and sports science insights.
              </p>
            </div>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© {currentYear} SportIndia. All rights reserved.</div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for Indian Sports</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-3 bg-primary rounded-sm"></div>
              <div className="w-4 h-3 bg-background border border-border rounded-sm"></div>
              <div className="w-4 h-3 bg-secondary rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
