export default function Map() {
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1388614748794!2d79.94083297499715!3d6.992921393008162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f9007bddc473%3A0xce1282d21eb24bfb!2sGanegoda%20International%20Private%20Limited!5e0!3m2!1sen!2slk!4v1765989118945!5m2!1sen!2slk";

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="100%"
      style={{ 
        border: 0,
        filter: "invert(1) hue-rotate(180deg) brightness(1.1) contrast(1.2) saturate(0)"
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ganegoda International Location"
      data-testid="map-embed"
      className="map-white-theme"
    />
  );
}

