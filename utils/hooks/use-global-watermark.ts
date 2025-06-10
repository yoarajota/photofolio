import { useState, useEffect } from "react";
import { WatermarkConfig } from "@/types";

export const DEFAULT_WATERMARK_CONFIG: WatermarkConfig = {
  text: "© Minha Marca",
  size: 24,
  opacity: 0.7,
  color: "#ffffff",
  rotation: 0,
  spacingX: 100,
  spacingY: 100,
  positionX: 0,
  positionY: 0,
};

const STORAGE_KEY = "watermark-config-global";

export function useGlobalWatermark() {
  const [globalConfig, setGlobalConfigState] = useState<WatermarkConfig>(
    DEFAULT_WATERMARK_CONFIG
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem(STORAGE_KEY);
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        setGlobalConfigState(parsedConfig);
      }
    } catch (error) {
      console.error(
        "Erro ao carregar configuração global de marca d'água:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveGlobalConfig = (config: WatermarkConfig) => {
    setGlobalConfigState(config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return config;
  };

  const resetToDefault = () => {
    const config = { ...DEFAULT_WATERMARK_CONFIG };
    setGlobalConfigState(config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return config;
  };

  return {
    globalConfig,
    saveGlobalConfig,
    resetToDefault,
    isLoading,
  };
}
