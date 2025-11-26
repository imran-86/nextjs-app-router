import PaperDetailsClient from "@/Components/PaperDetails";

export default async  function Details({params}) {
 
     const {paperId} = await params;

    return (
        <div>
            <PaperDetailsClient paperId={paperId}></PaperDetailsClient>
        </div>
    )
}