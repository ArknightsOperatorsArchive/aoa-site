import React from "react";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { ArtistSocials } from "../types/Artist";

interface SocialTagProps {
  social: ArtistSocials;
}

interface SocialTagTemplateProps {
  icon: React.ReactElement;
  social: {
    url?: string;
    displayName: string;
  };
}
const SocialTagTemplate: React.FC<SocialTagTemplateProps> = ({
  icon,
  social,
}) => {
  return (
    <div className="h-5 font-md flex items-center">
      {icon}
      {social.url ? (
        <a href={social.url} className="ml-1">
          {social.displayName}
        </a>
      ) : (
        <span>{`${social.url ? `${social.url} - ` : ""}${
          social.displayName
        }`}</span>
      )}
    </div>
  );
};

const SocialTag: React.FC<SocialTagProps> = ({ social }) => {
  switch (social.provider) {
    case "Twitter":
      return (
        <div className="text-blue-400">
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://twitter.com/${social.username}`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    case "Reddit":
      return (
        <div className="text-red-500">
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://reddit.com/u/${social.username}`,
              displayName: `u/${social.username}`,
            }}
          />
        </div>
      );
    case "Instagram":
      return (
        <div className="text-pink-500">
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Instagram</title>
                <path
                  d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://instagram.com/${social.username}`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    case "Pixiv":
      return (
        <div className="text-blue-400">
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>pixiv</title>
                <path
                  d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    case "Deviantart":
      return (
        <div>
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>DeviantArt</title>
                <path
                  d="M19.207 4.794l.23-.43V0H15.07l-.436.44-2.058 3.925-.646.436H4.58v5.993h4.04l.36.436-4.175 7.98-.24.43V24H8.93l.436-.44 2.07-3.925.644-.436h7.35v-5.993h-4.05l-.36-.438 4.186-7.977z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://deviantart.com/${social.username}`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    case "Twitch":
      return (
        <div
          style={{
            color: "#9146FF",
          }}
        >
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitch</title>
                <path
                  d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://twitch.com/${social.username}`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    case "Facebook":
      return (
        <div>
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook</title>
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://facebook.com/${social.username}`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    case "Patreon":
      return (
        <div>
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Patreon</title>
                <path
                  d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z"
                  fill="currentColor"
                />
              </svg>
            }
            social={{
              url: `https://patreon.com/${social.username}`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );

    case "Tumblr":
      return (
        <div>
          <SocialTagTemplate
            icon={
              <svg
                className="h-5 w-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Tumblr</title>
                  <path
                    d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"
                    fill="currentColor"
                  />
                </svg>
              </svg>
            }
            social={{
              url: `https://${social.username}.tumblr.com`,
              displayName: `@${social.username}`,
            }}
          />
        </div>
      );
    default:
      return (
        <div className="text-black-500">
          <SocialTagTemplate
            icon={<GlobeAltIcon className="h-5 w-5" />}
            social={{
              url: social.username,
              displayName: `${social.provider} - ${social.username}`,
            }}
          />
        </div>
      );
  }
};

export default SocialTag;
