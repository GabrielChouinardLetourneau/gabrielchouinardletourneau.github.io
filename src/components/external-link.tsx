import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Linking } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string; isEmail?: boolean };

export function ExternalLink({ href, isEmail, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          if (isEmail) {
            Linking.openURL(href);
          }
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }

      }}
    />
  );
}
