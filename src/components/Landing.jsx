import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer'; // Import the useInView hook
import Bckimage from './comp/images/background.jpg';
import '../css/Landing.css'; // Custom CSS for animations and design enhancements

const LandingPage = () => {
  // Define intersection observers for different sections
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutUsRef, aboutUsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [partnersRef, partnersInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div className="content" style={{ width: '100%' }}>
        {/* Top Bar */}
        <div className="bg-light py-2" style={{ marginTop: '-1px' }}>
          <Container>
            <Row className="justify-content-between">
              <Col xs="auto">
                <span><i className="bi bi-geo-alt-fill"></i> Find A Location</span> |
                <span> +01234567890</span> |
                <span> Example@gmail.com</span>
              </Col>
              <Col xs="auto">
                <Nav>
                  <Nav.Link href="#register">Register</Nav.Link>
                  <Nav.Link href="#login">Login</Nav.Link>
                  <Nav.Link href="/dashboard">My Dashboard</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Hero Section */}
        <div
          ref={heroRef}
          className={`hero-section text-center text-white ${heroInView ? 'animate-fade-in' : ''}`}
          style={{ backgroundImage: `url('${Bckimage}')`, backgroundSize: 'cover', padding: '100px 0' }}
        >
          <Container>
            <h2 className="mb-4">WELCOME TO STOCKER</h2>
            <h1 className="mb-4">INVEST YOUR MONEY WITH HIGHER RETURNS</h1>
            <p className="mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="d-flex justify-content-center flex-wrap">
              <Button variant="light" className="me-3 custom-button">Watch Video</Button>
              <Button variant="success" className="me-3 custom-button">Learn More</Button>
            </div>
            <p className="mt-4">
              Follow Us: 
              <i className="bi bi-facebook mx-2"></i>
              <i className="bi bi-twitter mx-2"></i>
              <i className="bi bi-youtube mx-2"></i>
              <i className="bi bi-linkedin mx-2"></i>
            </p>
          </Container>
        </div>

        {/* How it Works Section */}
        <Container ref={howItWorksRef} className={`how-it-works-section mt-5 text-center ${howItWorksInView ? 'animate-fade-in' : ''}`}>
          <h2>How It Works</h2>
          <p className="lead">3 Easy Steps to Get Started</p>
          <Row className="mt-4">
            <Col md={4}>
              <i className="bi bi-search fa-3x mb-3" style={{ fontSize: '50px'}}></i>
              <h5>Step 1: Search Markets</h5>
              <p>Find the best opportunities in the market with real-time data.</p>
            </Col>
            <Col md={4}>
              <i className="bi bi-bar-chart fa-3x mb-3" style={{ fontSize: '50px'}}></i>
              <h5>Step 2: Invest Wisely</h5>
              <p>Use our tools to invest in stocks with high growth potential.</p>
            </Col>
            <Col md={4}>
              <i className="bi bi-wallet2 fa-3x mb-3" style={{ fontSize: '50px'}}></i>
              <h5>Step 3: Grow Your Portfolio</h5>
              <p>Watch your investments grow with our expert guidance.</p>
            </Col>
          </Row>
        </Container>

        {/* About Us Section */}
        <div ref={aboutUsRef} className={`about-us-section mt-5 ${aboutUsInView ? 'animate-fade-in' : ''}`} style={{ backgroundColor: '#f9f9f9', padding: '60px 0' }}>
          <Container>
            <Row>
              <Col md={6}>
                <h2>About Us</h2>
                <p>
                  At Trade Tavern, we believe that trading should be accessible to everyone. Our mission is to provide traders with the tools and knowledge they need to succeed in a fast-paced market.
                  Whether you're a beginner or a seasoned professional, we have something for you.
                </p>
              </Col>
              <Col md={6}>
                <img src={Bckimage} alt="About Us" className="img-fluid rounded shadow" />
              </Col>
            </Row>
          </Container>
        </div>

        {/* Services Section */}
        <div ref={servicesRef} className={`services-section mt-5 ${servicesInView ? 'animate-fade-in' : ''}`}>
          <Container>
            <h2 className="text-center">Our Services</h2>
            <Row>
              <Col md={4}>
                <Card className="mb-4 service-card">
                  <Card.Body>
                    <img src={Bckimage} />
                    <Card.Title>Trading Courses</Card.Title>
                    <Card.Text>Learn from experts through our in-depth trading courses.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 service-card">
                  <Card.Body>
                    <img src={Bckimage} />
                    <Card.Title>Mentorship</Card.Title>
                    <Card.Text>Get personalized mentorship to refine your trading strategy.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 service-card">
                  <Card.Body>
                    <img src={Bckimage} />
                    <Card.Title>24/7 Support</Card.Title>
                    <Card.Text>Our team is here to help you at every step of your trading journey.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Partners Section */}
        <div ref={partnersRef} className={`partners-section mt-5 ${partnersInView ? 'animate-fade-in' : ''}`}>
          <Container>
            <h2 className="text-center">Our Trusted Partners</h2>
            <Row className="text-center mt-4">
              <Col md={2}><img src={Bckimage} alt="Partner 1" className="img-fluid" /></Col>
              <Col md={2}><img src={Bckimage} alt="Partner 2" className="img-fluid" /></Col>
              <Col md={2}><img src={Bckimage} alt="Partner 3" className="img-fluid" /></Col>
              <Col md={2}><img src={Bckimage} alt="Partner 4" className="img-fluid" /></Col>
              <Col md={2}><img src={Bckimage} alt="Partner 5" className="img-fluid" /></Col>
              <Col md={2}><img src={Bckimage} alt="Partner 6" className="img-fluid" /></Col>
            </Row>
          </Container>
        </div>

        {/* Testimonials Section */}
        <div ref={testimonialsRef} className={`testimonials-section mt-5 ${testimonialsInView ? 'animate-fade-in' : ''}`}>
          <Container>
            <h2 className="text-center">What Our Users Say</h2>
            <Row>
              <Col md={4}>
                <Card className="mb-4 service-card">
                  <Card.Body>
                    <img src={Bckimage} />
                    <Card.Text>
                      "Trade Tavern has completely changed my trading experience. The tools are intuitive and the community is incredibly supportive."
                    </Card.Text>
                    <Card.Footer>- John Doe</Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 service-card">
                  <Card.Body>
                    <img src={Bckimage} />
                    <Card.Text>
                      "I started trading with no experience, but with Trade Tavern's guidance, I feel confident in my trades every day."
                    </Card.Text>
                    <Card.Footer>- Jane Smith</Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 service-card">
                  <Card.Body>
                    <img src={Bckimage} />
                    <Card.Text>
                      "The mentorship program is outstanding! It has really helped me take my trading to the next level."
                    </Card.Text>
                    <Card.Footer>- Michael Johnson</Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Call to Action Section */}
        <div ref={ctaRef} className={`cta-section mt-5 text-center ${ctaInView ? 'animate-fade-in' : ''}`} style={{ backgroundColor: '#f0f0f0', padding: '60px 0' }}>
          <Container>
            <Row>
              <Col>
                <h2>Ready to Start Trading?</h2>
                <Button variant="success" size="lg" className="me-3 custom-button">Sign Up Now</Button>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Footer Section */}
        <footer className="mt-5 text-center">
          <Container>
            <Row>
              <Col>
                <p>&copy; {new Date().getFullYear()} Trade Tavern. All Rights Reserved.</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
