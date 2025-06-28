import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
  magicLink: string;
  hostUrl: string;
}

export const MagicLinkEmail = ({ magicLink, hostUrl }: MagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>EzyInvoice Get into your account.</Preview>
        <Container style={container}>
          <Img
            src={`${hostUrl}/favicon.ico`}
            width={48}
            height={48}
            alt="EzyInvoice Logo"
            style={{
              borderRadius: "100%",
            }}
          />
          <Heading style={heading}>🪄 Your magic link</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link style={link} href={magicLink}>
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              Or open this url: <Link href={magicLink}>{magicLink}</Link>
            </Text>
            <Text style={paragraph}>
              If you didn&apos;t request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- EzyInvoice Team
          </Text>
          <Hr style={hr} />
          <Img
            src={`${hostUrl}/favicon.ico`}
            width={32}
            height={32}
            style={{
              WebkitFilter: "grayscale(100%)",
              filter: "grayscale(100%)",
              margin: "20px 0",
              borderRadius: "100%",
            }}
            alt="EzyInvoice Logo"
          />
          <Text style={footer}>EzyInvoice Company</Text>
          <Text style={footer}>© All right reserved</Text>
        </Container>
      </Body>
    </Html>
  );
};

MagicLinkEmail.PreviewProps = {
  magicLink: "https://rudracode.com",
  hostUrl: "https://rudracode.com",
} as MagicLinkEmailProps;

export default MagicLinkEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
