import React, { Fragment, useState } from "react";

import UnderlineButton from "../../components/UnderlineButton";
import CoreDialog from "./CoreDialog";

const AboutProjectModal: React.FC = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <UnderlineButton
        onClick={() => setIsOpen(true)}
        className="text-2xl my-2"
      >
        project info
      </UnderlineButton>
      <CoreDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="font-black uppercase italic leading-6 max-w-xs">
          <h2 className="text-7xl">About the Project</h2>
        </div>
        <div className="mt-4">
          <p className="text-lg">
            This is a fan-made project where we aim to draw every single
            operator and create an archive, of sorts. We plan on compiling
            everyone’s art into a digital zine which will be available as a
            pay-what-you want zine and all profits will be donated to a charity
            of later choosing.
          </p>
        </div>
      </CoreDialog>
    </Fragment>
  );
};

export default AboutProjectModal;
