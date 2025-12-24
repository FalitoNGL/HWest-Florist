import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/components";

interface OrderEmailProps {
    orderId: string;
    customerName: string;
    totalAmount: number;
    items: {
        productName: string;
        quantity: number;
        price: number;
    }[];
}

export default function OrderEmail({
    orderId,
    customerName,
    totalAmount,
    items,
}: OrderEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New Order Received: {orderId}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-10 px-10">
                        <Heading className="text-2xl font-bold text-gray-900">
                            New Order Received! 💐
                        </Heading>
                        <Text className="text-gray-700">
                            Hello Admin, a new order has been placed by <strong>{customerName}</strong>.
                        </Text>
                        <Section className="my-4 p-4 bg-gray-50 rounded-lg">
                            <Text className="m-0 font-semibold">Order ID: {orderId}</Text>
                        </Section>
                        <Hr />
                        <Heading as="h3" className="text-lg font-semibold mt-4">Items Ordered</Heading>
                        <Section>
                            {items.map((item, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                                    <Text className="m-0">
                                        {item.quantity}x {item.productName}
                                    </Text>
                                    <Text className="m-0 font-medium">
                                        Rp {item.price.toLocaleString("id-ID")}
                                    </Text>
                                </div>
                            ))}
                        </Section>
                        <Hr className="my-4" />
                        <Section className="flex justify-between">
                            <Text className="text-lg font-bold">Total Amount</Text>
                            <Text className="text-lg font-bold text-green-600">
                                Rp {totalAmount.toLocaleString("id-ID")}
                            </Text>
                        </Section>
                        <Text className="text-xs text-gray-500 mt-8">
                            This is an automated notification from HWest Florist System.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
