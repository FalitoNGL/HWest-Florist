'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createOrder } from "@/app/actions/order";
import { useTransition } from "react";

// Form Schema
const formSchema = z.object({
    recipientName: z.string().min(1, "Name is required"),
    recipientPhone: z.string().min(10, "Valid phone required"),
    deliveryAddress: z.string().min(5, "Address must be clear"),
    deliveryTime: z.date(),
    // Optional based on type
    greetingType: z.string().optional(),
    targetName: z.string().optional(),
    senderName: z.string().optional(),
    cardMessage: z.string().optional(),
    notes: z.string().optional(),
});

interface OrderFormProps {
    product: {
        id: string;
        name: string;
        type: string;
    }
}

export function OrderForm({ product }: OrderFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipientName: "",
            recipientPhone: "",
            deliveryAddress: "",
            greetingType: "",
            targetName: "",
            senderName: "",
            cardMessage: "",
            notes: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("productId", product.id);
            formData.append("productName", product.name);
            formData.append("productType", product.type);

            // Append all form values
            Object.keys(values).forEach(key => {
                const val = values[key as keyof typeof values];
                if (val instanceof Date) {
                    formData.append(key, val.toISOString());
                } else if (val) {
                    formData.append(key, val as string);
                }
            });

            // No need to handle result because action redirects
            await createOrder(null, formData);
        });
    }

    const isBoard = product.type === "BOARD_FLOWER";
    const isBouquet = product.type === "BOUQUET";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delivery Details</h3>
                    <FormField
                        control={form.control}
                        name="deliveryTime"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Delivery Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date(new Date().setHours(0, 0, 0, 0)) // Disable past dates
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Budi Santoso" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recipientPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient WA</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0812..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="deliveryAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Address</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Jl. Sudirman No 5, Gedung A..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Dynamic Fields */}
                <div className="space-y-4 border-t pt-4">
                    <h3 className="text-lg font-medium">Message Details</h3>

                    {isBoard && (
                        <>
                            <FormField
                                control={form.control}
                                name="greetingType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Header Text (Ucapan)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Happy Wedding, Selamat Sukses..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="targetName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target Name (Yang Dituju)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Romeo & Juliet..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="senderName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sender Name (Dari)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Big Family..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {isBouquet && (
                        <FormField
                            control={form.control}
                            name="cardMessage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your message here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Input placeholder="Optional..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Order on WhatsApp
                </Button>
            </form>
        </Form>
    );
}
