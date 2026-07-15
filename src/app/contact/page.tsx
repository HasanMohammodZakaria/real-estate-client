import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactMap from "@/components/contact/ContactMap";


const ContactPage= () => {
    return (
        <div>
            <ContactHero />
            <ContactForm />
            <ContactMap />
        </div>
    );
};

export default ContactPage;