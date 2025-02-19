"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

import Lottie from "lottie-react";
import animationData from "/public/images/animations/success-animation.json";

export function MySuccessDialog({ isOpen, title='Success', message ='', onClose, delay = 800 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Reset progress when dialog opens
      setProgress(0);

      // Calculate the time it takes to complete 100% progress
      const incrementInterval = 2; // Update every 100ms
      const totalProgressDuration = delay; // Use delay as the total time for the progress
      const incrementAmount = (100 / totalProgressDuration) * incrementInterval; // How much progress to add every interval

      // Start a timer to increment the progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); // Stop the progress when it's 100
            return 100;
          }
          return prev + incrementAmount; // Increase progress based on time
        });
      }, incrementInterval); // Update progress every 100ms

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isOpen, delay]);

  useEffect(() => {
    let timeout;
    if (progress === 100) {
      // Close the dialog after the specified delay when progress is complete
      timeout = setTimeout(() => {
        onClose(); // Close the dialog
      }, delay); // Use the delay for closing
    }

    return () => {
      // Clear any existing timeout before setting a new one
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [progress, delay, onClose]); // Re-run when progress, delay, or onClose changes

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-auto overflow-hidden">
        <DialogHeader>
          <DialogHeader className="flex items-center justify-center">
            <Lottie
              animationData={animationData}
              className="flex items-center justify-center w-60"
              loop={false}
            />
          </DialogHeader>
          <DialogTitle className='text-center'>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <Progress
          value={progress}
          className="absolute left-0 right-0 w-full mt-4 -bottom-1"
        />
      </DialogContent>
    </Dialog>
  );
}
