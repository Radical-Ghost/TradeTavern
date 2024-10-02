import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap'; // Make sure you have react-bootstrap installed
import Sidebar from '../components/Sidebar'; 
import '../css/subscribe.css';

export default function Subscribe() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <div className="content" style={{ width: '100%' }}>
        {/* Top Bar */}
        <div className="bg-light py-2" style={{ marginTop: '-1px' }}>
          <Container>
            <Row className="justify-content-between">
              <Col xs="auto">
                <span>
                  <i className="bi bi-geo-alt-fill"></i> Find A Location
                </span>{' '}
                |<span> +01234567890</span> |
                <h5 style={{ display: 'inline-block', marginLeft: '10px' }}>Trade Tavern</h5>
              </Col>
              <Col xs="auto">
                <Nav>
                  <Nav.Link href="#register">Register</Nav.Link>
                  <Nav.Link href="#login">Login</Nav.Link>
                  <Nav.Link href="/">Logout</Nav.Link>
                  <Nav.Link href="/dashboard">My Dashboard</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </div>

        <main className='user-main'>
          <h1>Join our vibrant community!</h1>
          <p>Unlock exclusive content, insightful perspectives, and valuable resources by subscribing to BlogHub.</p>

          <section className="sub-plans">
            <div className="sub-plan">
              <h2 className='user-main-h2'>Basic</h2>
              <p>Essential access for casual readers.</p>
              <ul>
                <li>Monthly updates</li>
                <li>Limited exclusive content</li>
                <li>Community forum access</li>
              </ul>
              <div className="sub-price">₹99/month</div>
              <a href="#" className="button">Subscribe</a>
            </div>

            <div className="sub-plan featured">
              <h2 className='user-main-h2'>Pro</h2>
              <p>Premium experience for engaged readers.</p>
              <ul>
                <li>All Basic features</li>
                <li>Weekly in-depth analysis</li>
                <li>Early access to new content</li>
                <li>Member-only Q&A sessions</li>
              </ul>
              <div className="sub-price">₹299/month</div>
              <a href="#" className="button">Subscribe (Most Popular)</a>
            </div>

            <div className="sub-plan">
              <h2 className='user-main-h2'>Expert</h2>
              <p>Unmatched value for serious readers.</p>
              <ul>
                <li>All Pro features</li>
                <li>Personalized content recommendations</li>
                <li>Direct access to editors</li>
                <li>Discounts on partner resources</li>
              </ul>
              <div className="sub-price">₹599/month</div>
              <a href="#" className="button">Subscribe</a>
            </div>
          </section>

          <section className="sub-payment">
            <h2 className='user-main-h2'>Secure Payment Information</h2>
            <form className='user-form' action="/process-payment" method="POST">
              <label className="form-label" htmlFor="name">Name:</label>
              <input className="form-input" type="text" name="name" id="name" required />

              <label className="form-label" htmlFor="email">Email:</label>
              <input className="form-input" type="email" name="email" id="email" required />

              <label className="form-label" htmlFor="card-number">Card Number:</label>
              <input className="form-input" type="text" name="card-number" id="card-number" required pattern="^\d{16}$" maxLength="16" />

              <label className="form-label" htmlFor="expiry-date">Expiry Date:</label>
              <input className="form-input" type="text" name="expiry-date" id="expiry-date" required pattern="^\d{2}\/\d{2}$" maxLength="5" />

              <label className="form-label" htmlFor="cvv">CVV:</label>
              <input className="form-input" type="text" name="cvv" id="cvv" required pattern="^\d{3}$" maxLength="3" />

              <button className="form-button" type="submit">Subscribe Now</button>
            </form>
          </section>

          <section className="sub-guarantee">
            <h2 className='user-main-h2'>Satisfaction Guaranteed</h2>
            <p>We're confident you'll love your BlogHub subscription. If you're not completely satisfied within the first 30 days, simply cancel and receive a full refund.</p>
          </section>
        </main>

        <footer>
          <p>&copy; 2024 BlogHub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
