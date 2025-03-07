import ResumeBuilder from '../components/ResumeBuilder';

export default function Home() {
  return (
    <div className="min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">LaTeX Resume Builder</h1>
        <p className="text-gray-600">Build and customize your resume with drag-and-drop components</p>
      </header>
      <main>
        <ResumeBuilder />
      </main>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
