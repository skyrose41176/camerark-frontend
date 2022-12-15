import React from 'react';
import {Skeleton} from '@mui/material';
import {LoadingSkeleton} from 'src/components/base';
export interface SkeletonProps {}

export default function SkeletonThaoLuan(props: SkeletonProps) {
  return (
    <>
      {Array.from(Array(5).keys()).map(btn => (
        <div className="flex mt-2" key={btn}>
          <Skeleton variant="circular" width={30} height={30} />
          <div className="ml-1 flex flex-col">
            <div className="bg-[#f3f6f9] p-2 rounded-2xl">
              <LoadingSkeleton.Text width={200} />
              <LoadingSkeleton.Text width={170} />
              <LoadingSkeleton.Text height={50} />
            </div>
            <div className="flex items-center mt-1 px-2">
              <LoadingSkeleton.Text width={100} />
              <LoadingSkeleton.Text width={100} className="mx-2" />
              <LoadingSkeleton.Text width={100} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
