import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const totalStamps = 10;
  const [currentStamps, setCurrentStamps] = useState(0);

  const centerX = 100;
  const centerY = 100;
  const radius = 80;

  const starPoints = Array.from({ length: totalStamps }, (_, i) => {
    const angle = (2 * Math.PI * i) / totalStamps - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  });

  const progressRadius = 14;
  const circumference = 2 * Math.PI * progressRadius;
  const offset = circumference * (1 - currentStamps / totalStamps);

  // Update currentStamps every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStamps((prev) => (prev + 1) % (totalStamps + 1)); // Loop back to 0 after all are filled
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-wrapper">
      <header className="navbar">
        <div className="navbar-content">
          <img src="/logo.png" alt="Logo" className="logo-small" />
          <nav className="nav-buttons">
            <div className="nav-frame">
              <button className="nav-btn primary">Create an Account</button>
              <button className="nav-btn">Sign In</button>
              <button
                className="nav-btn"
                onClick={() => scrollToSection("faq")}
              >
                FAQ
              </button>
              <button
                className="nav-btn"
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </button>
              <button
                className="nav-btn"
                onClick={() => scrollToSection("benefits")}
              >
                Benefits
              </button>
              <button
                className="nav-btn"
                onClick={() => scrollToSection("guides")}
              >
                Guides
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero fancy-frame">
        <div className="hero-text-block">
          <h1>Your Smart, On-Demand Loyalty Program</h1>
          <p className="hero-sub">
            Say goodbye to paper stamp cards. Automate your customer rewards
            with digital QR loyalty — simple, seamless, and eco-friendly.
          </p>

          <ul className="hero-features">
            <li>💡 Intelligent automation</li>
            <li>📋 Easy customer tracking</li>
            <li>🚀 Optimized retention system</li>
          </ul>

          <div className="hero-buttons">
            <button className="cta-button">Try It Free</button>
            <button className="cta-button secondary">Learn More</button>
          </div>

          <p className="hero-disclaimer">
            * No payment method required for the free trial
          </p>
        </div>

        <div className="loyalty-star-container">
          <h2>Your Loyalty Progress</h2>
          <svg width="200" height="200">
            <defs>
              <radialGradient id="gold-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffacd" />
                <stop offset="100%" stopColor="#facc15" />
              </radialGradient>
            </defs>
            <circle
              cx={centerX}
              cy={centerY}
              r={progressRadius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={progressRadius}
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${centerX} ${centerY})`}
              className="central-ring"
            />
            <circle cx={centerX} cy={centerY} r="10" className="central-core" />
            {starPoints.map((point, i) => (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                className={`star-line ${i < currentStamps ? "active" : ""}`}
              />
            ))}
            {starPoints.map((point, i) => (
              <circle
                key={`tip-${i}`}
                cx={point.x}
                cy={point.y}
                className={`star-tip ${i < currentStamps ? "active" : ""}`}
              />
            ))}
          </svg>
        </div>
      </section>

      {/* Guides */}
      <section className="steps-section" id="guides">
        <h2 className="steps-title">How It Works</h2>
        <div className="steps-container">
          {[
            [
              "Sign Up",
              "Create your account to start earning rewards instantly.",
            ],
            ["Scan QR", "Scan the code at the restaurant after each visit."],
            [
              "Earn Points",
              "Collect stars for each visit and watch your progress grow.",
            ],
            [
              "Get Rewarded",
              "Unlock your free meal when your star is complete.",
            ],
          ].map((step, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="step-line" />}
              <div className="step-item">
                <div className="step-circle">{index + 1}</div>
                <div className="step-content">
                  <h3>{step[0]}</h3>
                  <p>{step[1]}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <h2>Pricing Plans</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free Trial</h3>
            <p>Try all features free for 1 month. No credit card required.</p>
            <ul>
              <li>✔️ Full access</li>
              <li>✔️ One restaurant</li>
              <li>✔️ Up to 100 customers</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Pro Plan – $3/month</h3>
            <p>Scale your loyalty program with unlimited access.</p>
            <ul>
              <li>✔️ All features</li>
              <li>✔️ Unlimited restaurants</li>
              <li>✔️ Unlimited customers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>How does the loyalty system work?</h4>
          <p>
            Customers scan a QR code at your restaurant after each visit. Every
            scan adds one point toward a reward.
          </p>
        </div>
        <div className="faq-item">
          <h4>Can I manage multiple locations?</h4>
          <p>
            Yes, with the Pro Plan you can add and manage multiple restaurant
            locations from one account.
          </p>
        </div>
        <div className="faq-item">
          <h4>What happens after the trial?</h4>
          <p>
            You can upgrade to the Pro Plan or continue with limited access
            under the free plan.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" id="benefits">
        <h2>Why You'll Love Our Service</h2>
        <p className="benefits-intro">
          Discover how thousands of users are already benefiting from our
          intelligent data management.
        </p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Cost Savings</h3>
            <p>
              Enjoy nearly unlimited data at a fraction of the price of official
              unlimited plans.
            </p>
          </div>
          <div className="benefit-card">
            <h3>No More Throttling</h3>
            <p>
              Say goodbye to slow connections. Our system auto-reloads before
              your speed gets throttled.
            </p>
          </div>
          <div className="benefit-card">
            <h3>Automatic Recharge</h3>
            <p>
              Set it once, relax forever. Our system monitors and reloads your
              data volume automatically.
            </p>
          </div>
          <div className="benefit-card">
            <h3>Maximum Security</h3>
            <p>
              Your data is protected by end-to-end encryption. We don’t store
              sensitive credentials on our servers.
            </p>
          </div>
          <div className="benefit-card">
            <h3>Simple & Worry-Free</h3>
            <p>
              Set it up once, enjoy forever. No complicated configurations, no
              constant adjustments needed.
            </p>
          </div>
          <div className="benefit-card">
            <h3>Test for Free</h3>
            <p>
              Try our service completely risk-free without any payment method
              required.
            </p>
          </div>
        </div>
        <div className="benefits-cta">
          <button className="cta-button">Try It Free</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-columns">
          <div>
            <h3>QR Loyalty</h3>
            <p>Your trusted partner in digital loyalty solutions.</p>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Email: support@qrloyalty.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
        <p className="footer-note">© 2025 QR Loyalty. All rights reserved.</p>
      </footer>
    </div>
  );
}
