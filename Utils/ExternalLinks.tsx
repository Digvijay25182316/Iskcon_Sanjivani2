import React from "react";
import { LinkIcon } from "@heroicons/react/24/solid";
import CopyClipBoard from "./CopyToClipBoard";
import QrCode from "./QrCodeComponent";
import { LinksActivator } from "./LinksActivator";
function ExternalLink({ Programs }: { Programs: ProgramsData }) {
  const handleClick = () => {
    console.log("Clicked");
  };
  const links = LinksActivator();
  return (
    <div
      className="w-full flex justify-between items-center px-5 gap-5"
      onClick={handleClick}
    >
      <a
        href={`${links}/activities/${Programs.id}`}
        className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
      >
        <LinkIcon className="h-4 w-4" />
        Link
      </a>
      <CopyClipBoard
        url={`${links}/activities/${Programs.id}`}
        whenCopied={"copied"}
        NotCopied={null}
      />
      <QrCode url={`${links}/activities/${Programs.id}`} Content="something" />
    </div>
  );
}

export default ExternalLink;
