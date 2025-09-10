
import React from "react";

interface AvatarProps {
  img?: string;
  alt?: string;
  fullName: string;
}

const Avatar: React.FC<AvatarProps> = ({ img, alt, fullName }) => {
  return (
    <div className="relative h-10 w-10 rounded-full flex items-center justify-center">
      {img ? (
        <img
          src={img}
          className="size-10 rounded-3xl object-cover object-center"
          alt={alt || `${fullName} avatar`}
        />
      ) : (
        <span className="font-medium size-10 rounded-full bg-white leading-10 border flex items-center justify-center">
          {getInitialsFromFullName(fullName)}
        </span>
      )}
    </div>
  );
};

function getInitialsFromFullName(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') {
    return "";
  }
  
  const parts = fullName.trim().split(" ");

  const validParts = parts.filter((part) => part.length > 0);
  if (validParts.length === 0) {
    return "";
  } else if (validParts.length === 1) {
    return validParts[0][0].toUpperCase();
  } else {
    const firstName = validParts[0];
    const lastName = validParts[validParts.length - 1];

    const firstInitial = firstName[0].toUpperCase();
    const lastInitial = lastName[0].toUpperCase();

    return firstInitial + lastInitial;
  }
}

export default Avatar;
