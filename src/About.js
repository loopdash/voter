import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';



class About extends Component {
  render() {
    return (
      <div className={`About`}>
        <div>
        <p><Link to="/">Back to questionnaire</Link></p>
          <h1>Using the Returning Citizens Tool</h1>
          <p>
            A number of Americans have unfortunately lost their right to vote because of a past felony conviction. However, just because an individual has a felony conviction, it does not necessarily mean that they are unable to vote in most states. Hip Hop Caucus has <a href="https://hiphopcaucus.org/hip-hop-caucus-launches-new-voting-tool-to-aid-returning-citizens-access-to-the-ballot-box/">launched</a> a free tool that will help returning citizens &ndash; people with a felony or misdemeanor &ndash; find out if they are eligible to vote. This tool aims to tackle that problem and inform individuals by aggregating laws on voting rights for all states in one place that walks each user through their potential eligibility and resources to sign up. If the user is not in fact eligible to vote, the tool will outline and explain exactly why that is the case.
          </p>
          <p>
            The data from this tool was compiled in partnership with the Lawyers' Committee for Civil Rights Under Law and the U.S. Vote Foundation. The data is currently managed by Hip Hop Caucus and is updated as voting restrictions for returning citizens change over time.
          </p>
          
          <h2>Adding the Tool on Your Site</h2>
            <p>
              We have created the ability to add the tool to your website using an embed code. The embed code can be used on any platform (Wordpress, Wix, Drupal, Craft, etc.) without having to install any plugins or widgets. A member of your communications team or your developer can assist with installing it using the steps below.
            </p>
          <h3><strong>Step 1:</strong> Create a new landing page on your website.</h3>
          <p>
            Landing pages can differ depending on your branding, but the embed code will stay the same. Here are two examples of landing pages:
          </p>

          <ul>
            <li><a href="https://hiphopcaucus.org/a-voting-tool-for-returning-citizens/">Hip Hop Caucus</a></li>
            <li><a href="http://respectmyvote.com/returning-citizens">Respect My Vote!</a></li>
          </ul>
          <h3><strong>Step 2:</strong> After creating the landing page, add your desired introduction text to the page.</h3>
          <h3><strong>Step 3:</strong> Copy the embed below.</h3>
          <blockquote>
          <p>
          &lt;iframe src="//vote.hiphopcaucus.org/?src=hhc" height="900px" type="text/javascript"&gt;&lt;/iframe&gt;
          </p>
          </blockquote>
          <h3><strong>Step 4:</strong> Using an HTML content block, paste the embed code onto the page. It should look like the screenshot below.</h3>
          <p>
            <img src="https://u1tl8hn7.directus.app/assets/23ed7838-4b10-445d-84f6-b4d600b2b54f?width=594&amp;height=206" alt="Iframe Wordpress" />\]
          </p>
          <h3><strong>Step 5:</strong> Publish the page and share with your networks!</h3>
          <p>Hip Hop Caucus is monitoring how many site visitors are using the tool, and we can share that information with all organizations who wish to receive the data. For additional technical questions, please contact JaRel Clay at <a href="mailto:jarel@hiphopcaucus.org">jarel@hiphopcaucus.org</a>.</p>
      </div>
      </div>
    );
  }
}
export default About;