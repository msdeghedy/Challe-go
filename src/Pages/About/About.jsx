import React from "react";
import "./About.scss";
const About = () => {
  return (
    <div className="bg-body page-about py-5 ">
      <div className=" container d-flex justify-content-start align-items-center ">
        <div className="content h-100">
          <h3 className="text-primary">About Challe.go</h3>
          <p>
            Challe.go is website for people who care about courses and learning
            new thing, but they struggle to finish what they started or they
            don't have someone to study with.
          </p>
          <p>
            So we figured out that we can solve this problem, and we found the
            best way to complete something is{" "}
            <span className="text-primary">"motivation"</span>.{" "}
          </p>
          <p>
            One of the best way to motivate yourself is{" "}
            <span className="text-primary">challenging yourself</span> and
            someone else challenging you.
          </p>
          <p>
            the feature of our website is you can start your challenge and share
            with other people and people with same interests can share this
            challenge with you, additionaly you can update your progress and
            share it too and see other people progress plus adding some comment
            about your progress, also you can make study buddies and open
            conversation with them.
          </p>
          <h4 className="text-primary">About our team</h4>
          <p>we are ITI graduation project team consists of four members:</p>
          <ol>
            <li>Amira Gamal</li>
            <li>Mostafa Mansour</li>
            <li>Amr Gawish</li>
            <li>Mahmoud Deghady</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About;
