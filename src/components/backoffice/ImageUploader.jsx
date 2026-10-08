import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { uploadApi } from '../../services/api';

export default function ImageUploader({
  value,
  onChange,
  folder = 'trillo/general',
  label = 'Fotografía Oficial',
  helperText = 'Formatos recomendados: JPG, PNG o WebP. Subida directa optimizada a Cloudinary.',
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación básica de tipo
    if (!file.type.startsWith('image/')) {
      setError('Por favor seleccione un archivo de imagen válido.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const secureUrl = await uploadApi.uploadDirectToCloudinary(file, folder);
      onChange(secureUrl);
    } catch (err) {
      console.error('Error al subir a Cloudinary:', err);
      setError(err.message || 'Fallo al subir la imagen.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8d9299]">
          {label}
        </label>
      )}

      {value ? (
        // Preview de imagen cargada
        <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#0d1015] p-2 flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-black/40 border border-white/5">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Check className="w-3 h-3" /> En Cloudinary
              </span>
            </div>
            <p className="text-xs text-[#d8cfc4] truncate font-mono select-all">
              {value}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#8d9299] hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> Ver original
              </a>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="text-[11px] text-[#e87a38] hover:underline"
              >
                Cambiar foto
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all shrink-0 mr-2"
            title="Quitar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Dropzone / Selector de archivo
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isUploading
              ? 'border-[#e87a38]/40 bg-[#e87a38]/5 cursor-wait'
              : 'border-white/10 hover:border-[#e87a38]/50 bg-white/[0.02] hover:bg-white/[0.04]'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="w-7 h-7 text-[#e87a38] animate-spin" />
              <p className="text-xs font-mono text-[#f5f4f0]">
                Firmando y subiendo directo a Cloudinary...
              </p>
              <span className="text-[10px] text-[#8d9299]">Por favor espere</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e87a38]">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs text-[#f5f4f0] font-medium">
                Hacé clic para seleccionar una imagen
              </p>
              <p className="text-[11px] text-[#8d9299] max-w-sm">
                {helperText}
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 font-mono mt-1">
          ⚠️ {error}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
