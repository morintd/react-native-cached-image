import {MMKV} from 'react-native-mmkv';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Platform} from 'react-native';
import {useCallback, useEffect, useState} from 'react';

const cache = new MMKV({
  id: 'images',
});

function getCachedImageEntry(baseUri: string) {
  const entry = cache.getString(baseUri);

  if (!entry) {
    return null;
  }

  return JSON.parse(entry) as CachedImageEntry;
}

export function useCachedImage(baseUri: string) {
  const [localPath, setLocalPath] = useState<string | undefined>(undefined);

  const onDownloadImage = useCallback(() => {
    const ext = baseUri.split(/[#?]/)[0].split('.').pop()?.trim();

    ReactNativeBlobUtil.config({fileCache: true, appendExt: ext})
      .fetch('GET', baseUri)
      .then(res => {
        const entry: CachedImageEntry = {
          createdAt: Date.now(),
          uri:
            Platform.OS === 'android'
              ? 'file://' + res.path()
              : '' + res.path(),
        };

        cache.set(baseUri, JSON.stringify(entry));
        setLocalPath(entry.uri);
      });
  }, [baseUri]);

  useEffect(() => {
    const entry = getCachedImageEntry(baseUri);

    if (!entry || entry.createdAt + ENTRY_EXPIRATION_MILISECONDS < Date.now()) {
      onDownloadImage();
    } else {
      setLocalPath(entry.uri);
    }
  }, [baseUri, onDownloadImage]);

  return [localPath, {onError: onDownloadImage}] as const;
}

const ENTRY_EXPIRATION_MILISECONDS = 7 * 24 * 60 * 60 * 1000; // 7 days in miliseconds

type CachedImageEntry = {
  uri: string;
  createdAt: number;
};
