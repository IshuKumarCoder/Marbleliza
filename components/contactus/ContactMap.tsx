export function ContactMap() {
  return (
    <section className="w-full">
      <div className="w-full">
        {/* Map Container - Full Width Edge to Edge */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14019.185197898376!2d77.37544216428445!3d28.545841840095118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce8acabc318cf%3A0x9859e3ec9939fe58!2sSalarpur%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1777738069321!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full border-0 grayscale-[20%] contrast-[105%]"
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Marbliza Headquarters Location - Noida Sector 49"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
