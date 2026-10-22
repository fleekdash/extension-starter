import { Button } from ".";
import {
  getSocialLoginFacebookAriaLabel,
  getSocialLoginGitHubAriaLabel,
  getSocialLoginGoogleAriaLabel,
  getSocialLoginXAriaLabel,
} from "./social-buttons-group-text";

export default function Component() {
  return (
    <div className="flex flex-col gap-4">
      {/* Icon-only buttons group */}
      <div className="inline-flex flex-wrap gap-2">
        <Button
          variant="outline"
          aria-label={getSocialLoginGoogleAriaLabel()}
          size="icon"
          radius="full"
          icon="simple-icons:google"
          iconClassName="h-4 w-4"
          shiny="hover"
        />
        <Button
          variant="outline"
          aria-label={getSocialLoginFacebookAriaLabel()}
          size="icon"
          radius="full"
          icon="simple-icons:facebook"
          iconClassName="h-4 w-4"
          shiny="hover"
        />
        <Button
          variant="outline"
          aria-label={getSocialLoginXAriaLabel()}
          size="icon"
          radius="full"
          icon="simple-icons:x"
          iconClassName="h-4 w-4"
          shiny="hover"
        />
        <Button
          variant="outline"
          aria-label={getSocialLoginGitHubAriaLabel()}
          size="icon"
          radius="full"
          icon="simple-icons:github"
          iconClassName="h-4 w-4"
          shiny="hover"
        />
      </div>

      {/* Full buttons with text */}
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          icon="simple-icons:google"
          iconClassName="h-5 w-5"
          className="w-full"
          shiny="hover">
          Continue with Google
        </Button>

        <Button
          variant="default"
          size="lg"
          icon="simple-icons:facebook"
          iconClassName="h-5 w-5"
          className="w-full"
          brandColor="#1877F2"
          shiny="hover">
          Continue with Facebook
        </Button>

        <Button
          variant="default"
          size="lg"
          icon="simple-icons:x"
          iconClassName="h-5 w-5"
          className="w-full"
          brandColor="#000000"
          shiny="hover">
          Continue with X
        </Button>

        <Button
          variant="default"
          size="lg"
          icon="simple-icons:github"
          iconClassName="h-5 w-5"
          className="w-full"
          brandColor="#24292F"
          shiny="hover">
          Continue with GitHub
        </Button>
      </div>

      {/* Small buttons with text */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          icon="simple-icons:google"
          iconClassName="h-4 w-4"
          shiny="hover">
          Google
        </Button>

        <Button
          variant="default"
          size="sm"
          icon="simple-icons:facebook"
          iconClassName="h-4 w-4"
          brandColor="#1877F2"
          shiny="hover">
          Facebook
        </Button>

        <Button
          variant="default"
          size="sm"
          icon="simple-icons:x"
          iconClassName="h-4 w-4"
          brandColor="#000000"
          shiny="hover">
          X
        </Button>

        <Button
          variant="default"
          size="sm"
          icon="simple-icons:github"
          iconClassName="h-4 w-4"
          brandColor="#24292F"
          shiny="hover">
          GitHub
        </Button>
      </div>
    </div>
  );
}
