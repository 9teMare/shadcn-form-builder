import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrayPath, Path, useFieldArray, UseFormReturn } from "react-hook-form";
import { TypeOf, z, ZodObject, ZodEnum, ZodNumber, ZodString, ZodBoolean, ZodArray } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming you have a Select component
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FieldClassNames<T extends ZodObject<any>> = Partial<Record<keyof TypeOf<T>, string>>;
interface FormBuilderProps<T extends ZodObject<any>> {
    formSchema: T;
    form: UseFormReturn<z.infer<T>, any, undefined>;
    onSubmit: (values: z.infer<T>) => void;
    className?: string;
    fieldClassName?: FieldClassNames<T>;
}

function renderField<T extends ZodObject<any>>(
    fieldName: string,
    fieldSchema: any,
    form: UseFormReturn<z.infer<T>, any, undefined>,
    fieldClassName?: FieldClassNames<T>,
    isFromArray = false
) {
    const nestingLevel = fieldName.split(".").length;
    const lastFieldName = fieldName.split(".")[nestingLevel - 1];
    let refinedFieldName = lastFieldName.split("_").join(" ").substring(0, 1).toUpperCase() + lastFieldName.split("_").join(" ").substring(1);

    if (isFromArray) {
        const oldIndex = fieldName.match(/\d+/);
        const index = oldIndex ? parseInt(oldIndex[0]) + 1 : "";
        refinedFieldName = `${refinedFieldName.split("[")[0]} ${index}`;
    }

    const fieldLabelStyle = nestingLevel === 1 && !fieldName.includes("[") && "font-semibold text-md";
    const fieldStyle = fieldClassName && fieldClassName[fieldName] ? fieldClassName[fieldName] : "";

    switch (fieldSchema.constructor) {
        case ZodNumber.prototype.constructor:
            return (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as Path<TypeOf<T>>}
                    render={({ field }) => (
                        <FormItem className={cn(fieldStyle)}>
                            <FormLabel className={cn(fieldLabelStyle)}>{refinedFieldName}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder={refinedFieldName}
                                    {...field}
                                    onChange={(value) => field.onChange(value.target.valueAsNumber)}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
        case ZodString.prototype.constructor:
            return (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as Path<TypeOf<T>>}
                    render={({ field }) => (
                        <FormItem className={cn(fieldStyle)}>
                            <FormLabel className={cn(fieldLabelStyle)}>{refinedFieldName}</FormLabel>
                            <FormControl>
                                <Input placeholder={refinedFieldName} {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
        case ZodBoolean.prototype.constructor:
            return (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as Path<TypeOf<T>>}
                    render={({ field }) => (
                        <FormItem className={cn("flex h-full flex-row items-center space-x-2 space-y-0", fieldStyle)}>
                            <FormLabel className={cn(fieldLabelStyle)}>{refinedFieldName}</FormLabel>
                            <FormControl>
                                <Checkbox className="size-5" checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
        case ZodEnum.prototype.constructor:
            const options = (fieldSchema as ZodEnum<any>).options as readonly string[];
            return (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as Path<TypeOf<T>>}
                    render={({ field }) => (
                        <FormItem className={cn(fieldStyle)}>
                            <FormLabel className={cn(fieldLabelStyle)}>{refinedFieldName}</FormLabel>
                            <FormControl>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Select ${refinedFieldName}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {options.map((option, index) => (
                                                <SelectItem key={index} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
        case ZodObject.prototype.constructor:
            return (
                <div key={fieldName} className="space-y-2">
                    <Label className={cn(fieldLabelStyle)}>{refinedFieldName}</Label>
                    <div className={cn("gap-4 grid grid-cols-4", fieldClassName && fieldClassName[fieldName] ? fieldClassName[fieldName] : "")}>
                        {Object.keys(fieldSchema.shape).map((subFieldName) =>
                            renderField(`${fieldName}.${subFieldName}`, fieldSchema.shape[subFieldName], form, fieldClassName)
                        )}
                    </div>
                </div>
            );
        case ZodArray.prototype.constructor:
            return renderArrayField(fieldName, fieldSchema, form);
        default:
            return null;
    }
}

function renderArrayField<T extends ZodObject<any>>(fieldName: string, fieldSchema: ZodArray<any>, form: UseFormReturn<z.infer<T>, any, undefined>) {
    const nestingLevel = fieldName.split(".").length;
    const lastFieldName = fieldName.split(".")[nestingLevel - 1];
    const refinedFieldName = lastFieldName.split("_").join(" ").substring(0, 1).toUpperCase() + lastFieldName.split("_").join(" ").substring(1);

    const fieldLabelStyle = nestingLevel === 1 && "font-semibold text-md";

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: fieldName as ArrayPath<TypeOf<T>>,
    });

    return (
        <div key={fieldName} className="space-y-4">
            <h3 className={cn(fieldLabelStyle)}>{refinedFieldName}</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                    {renderField(`${fieldName}[${index}]`, fieldSchema.element, form, undefined, true)}
                    <Button type="button" onClick={() => remove(index)}>
                        Remove
                    </Button>
                </div>
            ))}
            <Button type="button" onClick={() => append(fieldSchema.element._def.defaultValue)}>
                Add {refinedFieldName}
            </Button>
        </div>
    );
}

export default function FormBuilder<T extends ZodObject<any>>({ formSchema, form, onSubmit, className, fieldClassName }: FormBuilderProps<T>) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)}>
                {Object.keys(formSchema.shape).map((fieldName) => renderField(fieldName, formSchema.shape[fieldName], form, fieldClassName))}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
