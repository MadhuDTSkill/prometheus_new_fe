import React from 'react';
import { VscAdd } from "react-icons/vsc";
import CustomMLModel from '../components/CustomMLModel/CustomMLModel';

const CustomMLModels = () => {
    // Dummy data for ML Models
    const mlModelNames = [
        { name: "Predictor-Model" },
        { name: "Classifier-ML" },
        { name: "NeuralNet-Train" },
        { name: "Regressor-Optimizer" },
        { name: "Clustering-Algorithm" },
        { name: "Anomaly-Detector" },
        { name: "Decision-Tree" },
        { name: "SupportVector-Machine" },
        { name: "RandomForest-Model" },
        { name: "Boosting-Classifier" },
        { name: "DeepLearner-Network" },
        { name: "Gradient-Descent" },
        { name: "Bayesian-Inference" },
        { name: "TimeSeries-Predictor" },
        { name: "Reinforcement-Learner" },
        { name: "Image-Classifier" },
        { name: "Text-Analyzer" },
        { name: "Feature-Extractor" },
        { name: "Optimized-Search" },
        { name: "Hyperparameter-Tuner" },
        { name: "AutoML-Assistant" }
    ];

    return (
        <div className="h-full flex flex-col max-w-[1000px] mx-auto border-t border-main border-opacity-25 p-2">
            <div className='flex justify-around'>
                <h2 className="font-semibold mb-3 text-center text-main">Custom ML Models</h2>
            </div>
            <div className='flex-1 overflow-auto grid grid-cols-7 px-3'>
                <div className='flex flex-col justify-center items-center gap-2 p-1 rounded-md hover:scale-125 duration-200 transition-all'>
                    <VscAdd className='text-3xl text-main' />
                    <span className='text-[10px] truncate'>Create New</span>
                </div>
                {
                    mlModelNames.map((model, index) => (
                        <CustomMLModel model={model} key={index} />
                    ))
                }
            </div>
        </div>
    );
}

export default CustomMLModels;
