import * as React from "react"

export default function PrivacidadPage() {
  return (
    <div className="bg-transparent min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-12">Política de Privacidad</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Información al Usuario</h2>
            <p>
              Cafe Bar Titi, como responsable del tratamiento, le informa de que, según lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril (GDPR) y la L.O. 3/2018 de 5 de diciembre (LOPDGDD), trataremos sus datos tal y como reflejamos en la presente Política de Privacidad.
            </p>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Finalidad del Tratamiento</h2>
            <p>Operaciones previstas para tratar los datos:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Tramitación de pedidos, solicitudes de reserva o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.</li>
              <li>Remisión de comunicaciones comerciales publicitarias por email, fax, SMS, comunidades sociales o cualquier otro medio electrónico o físico, presente o futuro.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Criterios de Conservación de los Datos</h2>
            <p>
              Se conservarán mientras exista un interés mutuo para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.
            </p>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Derechos del Usuario</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Derecho a retirar el consentimiento en cualquier momento.</li>
              <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos.</li>
              <li>Derecho a presentar una reclamación ante la autoridad de control (aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Contacto para ejercer sus derechos</h2>
            <p className="font-bold text-primary">
              Email: info@cafebartiti.es<br />
              Dirección: Av. Palomares, 1, 41100 Coria del Río, Sevilla
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
