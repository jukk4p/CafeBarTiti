import * as React from "react"

export default function AvisoLegalPage() {
  return (
    <div className="bg-transparent min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-12">Aviso Legal</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Datos Identificativos</h2>
            <p>
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Titular:</strong> Cafe Bar Titi (en adelante, El Titular)</li>
              <li><strong>Domicilio social:</strong> Av. Palomares, 1, 41100 Coria del Río, Sevilla</li>
              <li><strong>CIF/NIF:</strong> [Insertar NIF]</li>
              <li><strong>Teléfono:</strong> 954 77 21 32</li>
              <li><strong>Email:</strong> info@cafebartiti.es</li>
            </ul>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Usuarios</h2>
            <p>
              El acceso y/o uso de este portal de Cafe Bar Titi atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
            </p>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Uso del Portal</h2>
            <p>
              bartiti.com proporciona el acceso a multitud de informaciones, servicios, programas o datos en Internet pertenecientes a El Titular a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
            </p>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p>
              El Titular por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.).
            </p>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
            <p>
              El Titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
