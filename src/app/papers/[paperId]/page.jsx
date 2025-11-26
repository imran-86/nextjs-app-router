export default async  function PaperDetails({params}) {
 
     const {paperId} = await params;

    return <p>PaperDetails page : {paperId}</p>
}