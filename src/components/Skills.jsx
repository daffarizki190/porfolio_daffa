import React from 'react';
import WavyText from './WavyText.jsx';
import { BriefcaseIcon, UserGroupIcon, CodeIcon, AnalysisIcon, CommunicationIcon, RocketIcon } from '../assets.jsx'; // Diperbaiki

const skillsData = [
  { name: "Manajemen Operasional", description: "Mampu merancang dan mengelola alur kerja operasional di lapangan.", icon: <BriefcaseIcon/> },
  { name: "Kepemimpinan Tim", description: "Mampu memimpin dan memotivasi tim untuk mencapai target operasional.", icon: <UserGroupIcon/> },
  { name: "Dasar Pemrograman", description: "Memiliki pemahaman dasar tentang konsep pemrograman dari studi ilmu komputer.", icon: <CodeIcon/> },
  { name: "Analisis & Pemecahan Masalah", description: "Kemampuan analitis untuk mengidentifikasi akar masalah dan menemukan solusi yang efisien.", icon: <AnalysisIcon/> },
  { name: "Komunikasi Efektif", description: "Kemampuan berkomunikasi dengan jelas kepada tim dan pelanggan untuk koordinasi yang lancar.", icon: <CommunicationIcon/> },
  { name: "Pembelajaran Cepat", description: "Dapat mempelajari teknologi dan sistem baru untuk meningkatkan kinerja.", icon: <RocketIcon/> },
];

const Skills = ({ theme, scrollDirection }) => {
  return (
    <section id="keahlian" className={`py-20 px-4 bg-white`}>
      <div className="container mx-auto text-center">
        <WavyText as="h2" text="Keahlian Saya" className="text-3xl font-bold text-gray-800" scrollDirection={scrollDirection} />
        <p className="text-gray-500 mt-2 mb-12 max-w-2xl mx-auto">
          Berikut adalah beberapa keahlian yang saya kembangkan dari pengalaman kerja dan perkuliahan.
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map(skill => (
            <div key={skill.name} className={`p-6 rounded-xl shadow-sm border text-center flex flex-col items-center bg-gray-50 border-gray-200`}>
                <div className={`rounded-lg w-12 h-12 flex items-center justify-center mb-4 ${theme.skillIconBg}`}>
                    {skill.icon}
                </div>
              <h3 className={`font-bold text-lg text-gray-900`}>{skill.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;