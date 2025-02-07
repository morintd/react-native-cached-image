import React, {Image, ImageProps} from 'react-native';
import {useCachedImage} from './useCachedImage';

type Props = Omit<ImageProps, 'source'> & {
  uri: string;
};

export function CachedImage({uri, ...props}: Props) {
  const [cachedURI, {onError}] = useCachedImage(uri);

  return (
    <Image
      {...props}
      source={{
        uri: cachedURI,
      }}
      onError={onError}
    />
  );
}
