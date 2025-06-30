export default function Banner() {
  return (
    <section className="bg-blue-600 text-white py-10">
      <div className="container mx-auto px-4 text-center">

        {/* Logo */}
        <img 
          src="/abhi.png" 
          alt="App Logo" 
         className="mx-auto mb-4 w-20 h-20 object-contain rounded-full"

        />

        <h1 className="text-3xl font-bold mb-4">
          Welcome to User Management App
        </h1>

        <p className="text-base mb-6">
          Easily register users, view list, and manage details with simple steps.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <p>✔ Easy to Use</p>
          <p>✔ Simple UI</p>
          <p>✔ Local Storage</p>
        </div>
        
      </div>
    </section>
  )
}
