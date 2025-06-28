import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type InvoiceEmailType = "new" | "reminder" | "update";

interface EzyInvoiceInvoiceProps {
  userFirstName: string;
  baseUrl: string;
  invoiceName: string;
  invoiceNumber: string;
  invoiceDueDate: string;
  totalAmount: string;
  invoiceUrl: string;
  fromName: string;
  type?: InvoiceEmailType; // "new" | "reminder" | "update"
}

export const EzyInvoiceInvoice = ({
  userFirstName,
  invoiceDueDate,
  invoiceName,
  totalAmount,
  baseUrl,
  invoiceNumber,
  invoiceUrl,
  fromName,
  type = "new",
}: EzyInvoiceInvoiceProps) => {
  const subjectPrefixes = {
    new: "Invoice",
    reminder: "Reminder: Invoice Due",
    update: "Update: Invoice Changed",
  };

  const messageBodies = {
    new: `Please find your invoice attached below. This invoice is from ${fromName}.`,
    reminder: `This is a gentle reminder regarding the unpaid invoice below. This invoice is from ${fromName}.`,
    update: `An update has been made to your invoice. Please review the latest changes from ${fromName}.`,
  };

  const subject = `${subjectPrefixes[type]} ${invoiceName}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>{subject}</Preview>
        <Container>
          <Section style={logo}>
            <Img
              src={`${baseUrl}/favicon.ico`}
              alt="EzyInvoice logo"
              width={48}
              height={48}
            />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={
                  type === "reminder"
                    ? `${baseUrl}/email/reminder-invoice-banner.png`
                    : `${baseUrl}/email/invoice-banner.png`
                }
                alt="EzyInvoice header illustration"
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {userFirstName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {messageBodies[type]}
                </Heading>

                <Text style={paragraph}>
                  <b>Invoice Name: </b>
                  {invoiceName} | INV-{invoiceNumber}
                </Text>
                <Text style={{ ...paragraph, marginTop: -15 }}>
                  <b>Invoice Due Date: </b>
                  {invoiceDueDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -15 }}>
                  <b>Amount: </b>
                  {totalAmount}
                </Text>

                {type === "reminder" && (
                  <Text style={paragraph}>
                    If you&apos;ve already made the payment, please ignore this
                    message. Otherwise, we kindly request your attention to this
                    matter.
                  </Text>
                )}

                <Text style={paragraph}>
                  If this isn&apos;t for you, there&apos;s nothing else you need
                  to do.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={buttonContainer} colSpan={2}>
                <Link href={invoiceUrl} target="_blank" style={button}>
                  View Invoice
                </Link>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`${baseUrl}/email/invoice-footer.png`}
              alt="EzyInvoice footer decoration"
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © All rights reserved | EzyInvoice Company
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EzyInvoiceInvoice;

EzyInvoiceInvoice.PreviewProps = {
  userFirstName: "John",
  baseUrl: "http://localhost:3000",
  invoiceName: "Website Development",
  invoiceNumber: "1001",
  invoiceDueDate: "2024-06-30",
  totalAmount: "$1,200.00",
  invoiceUrl: "http://localhost:3000",
  fromName: "Dev Rudra",
  type: "update",
} as EzyInvoiceInvoiceProps;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const buttonContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#0765e0",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  display: "inline-block",
  padding: "12px 30px",
  textDecoration: "none",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
