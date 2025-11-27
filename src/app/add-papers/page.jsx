import PaperSubmissionForm from "@/Components/PaperSubmissionForm";

export default function AddPapers(){
    return <div className="min-h-screen bg-base-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Submit Your Research Paper</h1>
            <p className="text-xl text-gray-600">
              Share your research with the academic community
            </p>
          </div>
          
          <PaperSubmissionForm />
          
          {/* Guidelines Section */}
          <div className="mt-12 bg-info text-info-content p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">📝 Submission Guidelines</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Ensure your abstract clearly summarizes your research</li>
              <li>Provide accurate and complete information</li>
              <li>Use relevant tags to improve discoverability</li>
              <li>All submitted papers will be reviewed before publication</li>
              <li>Make sure you have the rights to publish the research</li>
            </ul>
          </div>
        </div>
      </div>
}