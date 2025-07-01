import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const translations = {
  sv: {
    title: 'Om FilMak Studio',
    backToHome: '← Tillbaka till startsidan',
    intro: 'Välkommen till FilMak Studio',
    introText: 'Vi specialiserar oss på att skapa vackra, personliga affischer för dina viktigaste livshändelser. Varje affisch är handgjord med omsorg och uppmärksamhet på detaljer.',
    services: 'Våra tjänster',
    servicesText: 'Vi erbjuder skräddarsydda affischer för bröllop, dop, studentfiranden, födelsedagar, examensfiranden och inspiration. Alla affischer trycks i hög kvalitet och kan anpassas efter dina önskemål.',
    process: 'Vår process',
    processText: '1. Du kontaktar oss med dina önskemål och foton\n2. VI skapar en unik design för din affisch\n3. Du får en digital förhandsvisning\n4. Efter godkännande trycks affischen i hög kvalitet\n5. Din färdiga affisch levereras till dig',
    contact: 'Kontakta oss',
    contactText: 'Är du redo att skapa din egen personliga affisch? Kontakta oss för att diskutera dina önskemål och få en offert.',
    phone: 'Telefon:',
    email: 'E-post:',
    responseTime: 'Vi svarar vanligtvis inom 24 timmar.'
  },
  en: {
    title: 'About FilMak Studio',
    backToHome: '← Back to homepage',
    intro: 'Welcome to FilMak Studio',
    introText: 'I specialize in creating beautiful, personalized posters for your most important life events. Each poster is handcrafted with care and attention to detail.',
    services: 'Our Services',
    servicesText: 'I offer custom-designed posters for weddings, baptisms, graduations, birthdays, exam celebrations, and inspiration. All posters are printed in high quality and can be customized to your preferences.',
    process: 'Our Process',
    processText: '1. You contact me with your wishes and photos\n2. I create a unique design for your poster\n3. You receive a digital preview\n4. After approval, the poster is printed in high quality\n5. Your finished poster is delivered to you',
    contact: 'Contact Me',
    contactText: 'Ready to create your own personalized poster? Contact me to discuss your wishes and get a quote.',
    phone: 'Phone:',
    email: 'Email:',
    responseTime: 'I usually respond within 24 hours.'
  },
  ti: {
    title: 'ብዛዕባ ፊልማክ ስቱድዮ',
    backToHome: '← ናብ መጀመርታ ተመለስ',
    intro: 'ናብ ፊልማክ ስቱድዮ ብደሓን መጻእኩም',
    introText: 'ንዝለዓለ ህይወትኩም ፍጻሜታት ፈትናዊ ፖስተራት ክፈጥር እየ ዝሰራሕለይ። ነፍሲ ወከፍ ፖስተር ብጥንቃቐን እናተሰርሐን እዩ ዝሰራሕ።',
    services: 'ኣገልግሎትና',
    servicesText: 'ንመርዓታት፣ ጥምቀትታት፣ መመረቅታታት፣ ልደትታት፣ ፈተናታትን ምልኣኽታትን ዝምልከት ስፍራዊ ፖስተራት እየ ዝህብ። ኩሎም ፖስተራት ብሰንኪ ዝሰማምዑ እዮም ዝሕተሙ።',
    process: 'ሂደትና',
    processText: '1. ብምኽሪኹምን ስእልታትኩምን ክትራኸቡኒ እኹም\n2. ንፖስተርኩም ፍልይ ዲዛይን እፈጥር\n3. ዲጂታል ቅድመ ምርኣይ ክትወስዱ እኹም\n4. ድሕሪ ምጽድቓ ፖስተር ብሰንኪ ይሕተም\n5. ፖስተርኩም ክድህለኩም እዩ',
    contact: 'ክትራኸቡኒ',
    contactText: 'ንርእስኹም ዝምልከት ፖስተር ክትፈጥሩ ደልዩ እኹም? ንምኽሪኹም ክትራኸቡኒን ንምርኣይ ክትረኽቡን እኹም።',
    phone: 'ስልኪ:',
    email: 'ኢመይል:',
    responseTime: 'ኣብ ውስጢ 24 ሰዓታት እየ ዝምልስ።'
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState('sv');
  const t = translations[lang];

  return (
    <div className="page-container">
      <Header lang={lang} setLang={setLang} />
      
      {/* Back to home */}
      <div className="section">
        <Link to="/" className="back-link">
          {t.backToHome}
        </Link>
      </div>

      {/* Title */}
      <section className="section">
        <h1 className="page-title">
          {t.title}
        </h1>
      </section>

      {/* Content */}
      <section className="section-with-margin">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Introduction */}
          <div style={{ 
            background: '#fff', 
            padding: 32, 
            borderRadius: 16, 
            marginBottom: 24,
            boxShadow: '0 2px 16px rgba(102,126,234,0.08)',
            border: '1px solid #e8e8f8'
          }}>
            <h2 style={{ 
              fontSize: '1.8em', 
              color: '#667eea', 
              marginBottom: 16,
              fontWeight: 700
            }}>
              {t.intro}
            </h2>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: 1.7, 
              color: '#333',
              margin: 0
            }}>
              {t.introText}
            </p>
          </div>

          {/* Services */}
          <div style={{ 
            background: '#fff', 
            padding: 32, 
            borderRadius: 16, 
            marginBottom: 24,
            boxShadow: '0 2px 16px rgba(102,126,234,0.08)',
            border: '1px solid #e8e8f8'
          }}>
            <h2 style={{ 
              fontSize: '1.8em', 
              color: '#667eea', 
              marginBottom: 16,
              fontWeight: 700
            }}>
              {t.services}
            </h2>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: 1.7, 
              color: '#333',
              margin: 0
            }}>
              {t.servicesText}
            </p>
          </div>

          {/* Process */}
          <div style={{ 
            background: '#fff', 
            padding: 32, 
            borderRadius: 16, 
            marginBottom: 24,
            boxShadow: '0 2px 16px rgba(102,126,234,0.08)',
            border: '1px solid #e8e8f8'
          }}>
            <h2 style={{ 
              fontSize: '1.8em', 
              color: '#667eea', 
              marginBottom: 16,
              fontWeight: 700
            }}>
              {t.process}
            </h2>
            <div style={{ 
              fontSize: '1.1em', 
              lineHeight: 1.8, 
              color: '#333',
              whiteSpace: 'pre-line'
            }}>
              {t.processText}
            </div>
          </div>

          {/* Contact */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: 32, 
            borderRadius: 16,
            color: '#fff',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '1.8em', 
              marginBottom: 16,
              fontWeight: 700
            }}>
              {t.contact}
            </h2>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: 1.7, 
              marginBottom: 24,
              opacity: 0.95
            }}>
              {t.contactText}
            </p>
            <div style={{ 
              fontSize: '1.2em', 
              fontWeight: 600,
              marginBottom: 8
            }}>
              {t.phone} <a href="tel:+467000395606" style={{ color: '#fff', textDecoration: 'underline' }}>+46 70 003 95 606</a>
            </div>
            <div style={{ 
              fontSize: '0.9em', 
              opacity: 0.8,
              fontStyle: 'italic'
            }}>
              {t.responseTime}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        &copy; {new Date().getFullYear()} FilMak Studio. All rights reserved.
      </footer>
    </div>
  );
} 