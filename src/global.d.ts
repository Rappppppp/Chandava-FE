// global.d.ts
export { };

declare global {
    interface OptionPropsGlobalInterface {
        value: string | number;
        label: string;
        disabled?: boolean;
    }
}
