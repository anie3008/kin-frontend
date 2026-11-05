import CreateEventForm from "@/components/events/CreateEventForm";

const CreateEventPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#466060]">
            Create an Event
          </h1>
          <p className="text-gray-500 mt-2">
            Bring your community together and make a difference.
          </p>
        </div>

        <CreateEventForm />
      </div>
    </main>
  );
};

export default CreateEventPage;