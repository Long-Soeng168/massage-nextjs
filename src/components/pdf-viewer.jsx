"use client";
import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, ProgressBar } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFViewer = ({pdfUrl = '/sample.pdf'}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="h-[calc(100vh-50px)]">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
      {/* <Worker workerUrl={`/js/pdf-worker-3-11-174.min.js`}> */}
        <Viewer
          defaultScale='PageFit'
          fileUrl={pdfUrl}
          renderLoader={(percentages) => (
            <div style={{ width: "240px" }}>
              <ProgressBar progress={Math.round(percentages)} />
            </div>
          )}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
