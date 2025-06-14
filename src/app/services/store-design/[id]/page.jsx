"use client"

import { useParams } from "next/navigation";
import Banner from "../banner.jsx";
import ServiceDetail from "../servicedetails.jsx";

export default function About() {
    const params = useParams()
    return (<>
        <Banner id={params.id}/>
        <ServiceDetail id={params.id} />
</>
    );
}
