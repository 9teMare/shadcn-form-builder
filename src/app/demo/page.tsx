"use client";

import FormBuilder from "@/components/form-builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const formSchema = z.object({
    company_full_name: z.string(),
    company_short_name: z.string(),
    company_group_name: z.string(),
    approval_status: z.enum(["Draft", "Approved", "Rejected"]),
    status_control: z.object({
        active: z.boolean(),
        suspended: z.boolean(),
    }),
    net_position_limit: z.number(),
    gross_position_limit: z.number(),
    limits_per_trading_month: z.object({
        spot_month: z.number(),
        fwd_month_1: z.number(),
        fwd_month_2: z.number(),
        fwd_month_3: z.number(),
        fwd_month_4: z.number(),
        fwd_month_5: z.number(),
        fwd_month_6: z.number(),
        fwd_month_7: z.number(),
        fwd_month_8: z.number(),
        fwd_month_9: z.number(),
        fwd_month_10: z.number(),
        fwd_month_11: z.number(),
        all_other_fwd_months: z.number(),
    }),
    tradable_products: z
        .array(
            z.object({
                name: z.string(),
                serial_number: z.string(),
            })
        )
        .min(1),
    allowed_payment_terms: z
        .array(
            z.object({
                name: z.string(),
                serial_number: z.string(),
            })
        )
        .min(1),
    company_address: z.object({
        address_line_1: z.string(),
        address_line_2: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal_code: z.string(),
        telephone: z.string(),
        fax: z.string(),
        trade_confirmation_emails: z.array(z.string().email()).min(1),
        operation_emails: z.array(z.string().email()).min(1),
        invoice_emails: z.array(z.string().email()).min(1),
    }),
    delivery_address: z.object({
        address_line_1: z.string(),
        address_line_2: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal_code: z.string(),
        telephone: z.string(),
        fax: z.string(),
        trade_confirmation_emails: z.array(z.string().email()).min(1),
        operation_emails: z.array(z.string().email()).min(1),
        invoice_emails: z.array(z.string().email()).min(1),
    }),
    contact_persons: z
        .array(
            z.object({
                honorific: z.string(),
                given_name: z.string(),
                surname: z.string(),
                position: z.string(),
                email: z.string().email(),
                mobile: z.string(),
                telephone: z.string(),
            })
        )
        .min(1),
    bank_accounts: z
        .array(
            z.object({
                bank_name: z.string(),
                swift_code: z.string(),
                branch_name: z.string(),
                branch_code: z.string(),
                telephone: z.string(),
                email: z.string().email(),
                intermediary_bank_name: z.string(),
                business_address: z.string(),
                delivery_address: z.string(),
            })
        )
        .min(1),
});

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company_full_name: "",
            company_short_name: "",
            company_group_name: "",
            approval_status: "Draft",
            status_control: {
                active: true,
                suspended: false,
            },
            net_position_limit: 0,
            gross_position_limit: 0,
            limits_per_trading_month: {
                spot_month: 0,
                fwd_month_1: 0,
                fwd_month_2: 0,
                fwd_month_3: 0,
                fwd_month_4: 0,
                fwd_month_5: 0,
                fwd_month_6: 0,
                fwd_month_7: 0,
                fwd_month_8: 0,
                fwd_month_9: 0,
                fwd_month_10: 0,
                fwd_month_11: 0,
                all_other_fwd_months: 0,
            },
            tradable_products: [
                {
                    name: "",
                    serial_number: "",
                },
            ],
            allowed_payment_terms: [
                {
                    name: "",
                    serial_number: "",
                },
            ],
            company_address: {
                address_line_1: "",
                address_line_2: "",
                city: "",
                state: "",
                country: "",
                postal_code: "",
                telephone: "",
                fax: "",
                trade_confirmation_emails: [""],
                operation_emails: [""],
                invoice_emails: [""],
            },
            delivery_address: {
                address_line_1: "",
                address_line_2: "",
                city: "",
                state: "",
                country: "",
                postal_code: "",
                telephone: "",
                fax: "",
                trade_confirmation_emails: [""],
                operation_emails: [""],
                invoice_emails: [""],
            },
            contact_persons: [
                {
                    honorific: "",
                    given_name: "",
                    surname: "",
                    position: "",
                    email: "",
                    mobile: "",
                    telephone: "",
                },
            ],
            bank_accounts: [
                {
                    bank_name: "",
                    swift_code: "",
                    branch_name: "",
                    branch_code: "",
                    telephone: "",
                    email: "",
                    intermediary_bank_name: "",
                    business_address: "",
                    delivery_address: "",
                },
            ],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div>
            Demo
            <FormBuilder
                formSchema={formSchema}
                form={form}
                onSubmit={onSubmit}
                className="w-full"
                fieldClassName={{
                    limits_per_trading_month: "grid-cols-2",
                }}
            />
        </div>
    );
}
