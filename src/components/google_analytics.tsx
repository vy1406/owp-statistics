import { GoogleTagManager } from '@next/third-parties/google'


const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""

export default function GoogleAalytics() {
    return (<GoogleTagManager gtmId={GA_ID} />);
}
