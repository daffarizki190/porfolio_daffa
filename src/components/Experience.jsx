import React from 'react';
import WavyText from './WavyText.jsx';
import { BriefcaseIcon } from '../assets.jsx'; // Diperbaiki

const experiencesData = [
  { role: "Leader Operasional Parking (Gandaria City)", company: "PT. CENTRAPARK CITRA CORPORA", period: "September 2021 - Sekarang", tasks: ["Memimpin dan mengawasi jalannya operasional parkir di lokasi Gandaria City.", "Mengelola alur masuk dan keluar kendaraan untuk efisiensi maksimal.", "Memberikan pelatihan kepada tim mengenai standar pelayanan."] },
  { role: "Leader Operasional Parking (Distrik 8 SCBD)", company: "PT. CENTRAPARK CITRA CORPORA", period: "Juli 2020 - September 2021", tasks: ["Bertanggung jawab atas operasional parkir di lokasi Distrik 8 SCBD.", "Mengelola alur masuk dan keluar kendaraan.", "Membantu memastikan kelancaran operasional harian."] },
  { role: "Kasir Parking (RS Medistra)", company: "PT. IPM", period: "Agustus 2019 - Juli 2020", tasks: ["Melayani transaksi pembayaran parkir di Rumah Sakit Medistra.", "Mengelola pencatatan keuangan harian terkait parkir."] }
];

const Experience = ({ theme, scrollDirection }) => {
  return (
    <section id="pengalaman" className="py-20 px-4 bg-gray-100">
      <div className="container mx-auto">
        <WavyText as="h2" text="Pengalaman Kerja" className="text-3xl font-bold text-center text-gray-800" scrollDirection={scrollDirection} />
        <p className="text-gray-500 mt-2 mb-12 text-center">
          Berikut adalah detail perjalanan karir saya hingga saat ini.
        </p>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiencesData.map(exp => (
            <div key={exp.role} className={`p-6 rounded-xl shadow-md border flex items-start gap-4 bg-white border-gray-200`}>
              <div className={`${theme.accent} pt-1`}><BriefcaseIcon /></div>
              <div>
                <h3 className={`font-bold text-lg text-gray-900`}>{exp.role}</h3>
                <p className="text-gray-600 font-medium text-sm">{exp.company}</p>
                <p className="text-gray-400 text-xs mt-1">{exp.period}</p>
                <ul className="list-disc list-inside text-gray-600 text-sm mt-3 space-y-1">
                  {exp.tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;