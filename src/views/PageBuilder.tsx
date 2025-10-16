import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { RichTextEditor } from './ui/RichTextEditor';

interface PageComponent {
  type: string;
  title?: string;
  subtitle?: string;
  text?: string;
  btn_text?: string;
  btn_link?: string;
  image_url?: string;
  rich_content?: string;
  font_family?: string;
  text_align?: string;
  features?: Array<{ icon: string; title: string; desc: string }>;
  quote?: string;
  author?: string;
  author_title?: string;
}

interface PageBuilderProps {
  pageData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ pageData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    language: 'English',
    description: '',
    components: [] as PageComponent[]
  });

  useEffect(() => {
    if (pageData) {
      setFormData({
        title: pageData.title || '',
        slug: pageData.key || '',
        language: pageData.lang || 'English',
        description: pageData.description || '',
        components: pageData.components || []
      });
    }
  }, [pageData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addComponent = (type: string) => {
    const newComponent: PageComponent = {
      type,
      ...(type === 'hero' && { title: '', subtitle: '', btn_text: '', btn_link: '', image_url: '', rich_content: '' }),
      ...(type === 'features' && { title: '', rich_content: '', image_url: '', features: [] }),
      ...(type === 'cta' && { text: '', btn_text: '', rich_content: '', image_url: '' }),
      ...(type === 'testimonial' && { quote: '', author: '', author_title: '', rich_content: '', image_url: '' })
    };
    
    setFormData(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  };

  const removeComponent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }));
  };

  const updateComponent = (index: number, updates: Partial<PageComponent>) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.map((comp, i) => i === index ? { ...comp, ...updates } : comp)
    }));
  };

  const moveComponent = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.components.length) return;

    setFormData(prev => {
      const newComponents = [...prev.components];
      [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
      return { ...prev, components: newComponents };
    });
  };

  const renderComponentEditor = (component: PageComponent, index: number) => {
    const commonInputClasses = "mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm transition-shadow";

    return (
      <div key={index} className="border border-slate-200 rounded-xl p-4 mb-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <GripVertical className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700 capitalize">{component.type.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => moveComponent(index, 'up')}
              disabled={index === 0}
              className="p-1 text-slate-400 hover:text-primary-600 disabled:opacity-50"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => moveComponent(index, 'down')}
              disabled={index === formData.components.length - 1}
              className="p-1 text-slate-400 hover:text-primary-600 disabled:opacity-50"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => removeComponent(index)}
              className="p-1 text-slate-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {component.type === 'hero' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600">Title</label>
                <input
                  type="text"
                  value={component.title || ''}
                  onChange={(e) => updateComponent(index, { title: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Subtitle</label>
                <input
                  type="text"
                  value={component.subtitle || ''}
                  onChange={(e) => updateComponent(index, { subtitle: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Button Text</label>
                <input
                  type="text"
                  value={component.btn_text || ''}
                  onChange={(e) => updateComponent(index, { btn_text: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Button Link</label>
                <input
                  type="text"
                  value={component.btn_link || ''}
                  onChange={(e) => updateComponent(index, { btn_link: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Background Image URL</label>
              <input
                type="text"
                value={component.image_url || ''}
                onChange={(e) => updateComponent(index, { image_url: e.target.value })}
                className={commonInputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Rich Text Content</label>
              <RichTextEditor
                value={component.rich_content || ''}
                onChange={(value) => updateComponent(index, { rich_content: value })}
              />
            </div>
          </div>
        )}

        {component.type === 'cta' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600">Call to Action Text</label>
                <input
                  type="text"
                  value={component.text || ''}
                  onChange={(e) => updateComponent(index, { text: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Button Text</label>
                <input
                  type="text"
                  value={component.btn_text || ''}
                  onChange={(e) => updateComponent(index, { btn_text: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Background Image URL</label>
              <input
                type="text"
                value={component.image_url || ''}
                onChange={(e) => updateComponent(index, { image_url: e.target.value })}
                className={commonInputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Rich Text Content</label>
              <RichTextEditor
                value={component.rich_content || ''}
                onChange={(value) => updateComponent(index, { rich_content: value })}
              />
            </div>
          </div>
        )}

        {component.type === 'testimonial' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Quote</label>
              <textarea
                value={component.quote || ''}
                onChange={(e) => updateComponent(index, { quote: e.target.value })}
                rows={3}
                className={commonInputClasses}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Author</label>
                <input
                  type="text"
                  value={component.author || ''}
                  onChange={(e) => updateComponent(index, { author: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Author Title</label>
                <input
                  type="text"
                  value={component.author_title || ''}
                  onChange={(e) => updateComponent(index, { author_title: e.target.value })}
                  className={commonInputClasses}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Author Image URL</label>
              <input
                type="text"
                value={component.image_url || ''}
                onChange={(e) => updateComponent(index, { image_url: e.target.value })}
                className={commonInputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Rich Text Content</label>
              <RichTextEditor
                value={component.rich_content || ''}
                onChange={(value) => updateComponent(index, { rich_content: value })}
              />
            </div>
          </div>
        )}

        {component.type === 'features' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Main Title</label>
              <input
                type="text"
                value={component.title || ''}
                onChange={(e) => updateComponent(index, { title: e.target.value })}
                className={commonInputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Rich Text Content</label>
              <RichTextEditor
                value={component.rich_content || ''}
                onChange={(value) => updateComponent(index, { rich_content: value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Image URL</label>
              <input
                type="text"
                value={component.image_url || ''}
                onChange={(e) => updateComponent(index, { image_url: e.target.value })}
                className={commonInputClasses}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Feature Items</label>
              <div className="mt-2 space-y-2">
                {(component.features || []).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <input
                      type="text"
                      placeholder="Icon (e.g. bi-star)"
                      value={feature.icon}
                      onChange={(e) => {
                        const newFeatures = [...(component.features || [])];
                        newFeatures[featureIndex] = { ...feature, icon: e.target.value };
                        updateComponent(index, { features: newFeatures });
                      }}
                      className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...(component.features || [])];
                        newFeatures[featureIndex] = { ...feature, title: e.target.value };
                        updateComponent(index, { features: newFeatures });
                      }}
                      className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={feature.desc}
                      onChange={(e) => {
                        const newFeatures = [...(component.features || [])];
                        newFeatures[featureIndex] = { ...feature, desc: e.target.value };
                        updateComponent(index, { features: newFeatures });
                      }}
                      className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = component.features?.filter((_, i) => i !== featureIndex) || [];
                        updateComponent(index, { features: newFeatures });
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = [...(component.features || []), { icon: '', title: '', desc: '' }];
                    updateComponent(index, { features: newFeatures });
                  }}
                  className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-medium"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const generatePreview = () => {
    if (formData.components.length === 0) {
      return <div className="text-center text-slate-500 p-8">Add components to see preview</div>;
    }

    return formData.components.map((component, index) => {
      switch (component.type) {
        case 'hero':
          return (
            <div key={index} className="relative text-white text-center py-20 px-6 bg-slate-700">
              {component.image_url && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{ backgroundImage: `url(${component.image_url})` }}
                />
              )}
              <div className="relative">
                <h1 className="text-4xl font-bold">{component.title || 'Hero Title'}</h1>
                <p className="text-xl mt-2">{component.subtitle || 'Hero Subtitle'}</p>
                {component.rich_content && (
                  <div className="mt-4" dangerouslySetInnerHTML={{ __html: component.rich_content }} />
                )}
                {component.btn_text && (
                  <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg">
                    {component.btn_text}
                  </button>
                )}
              </div>
            </div>
          );

        case 'cta':
          return (
            <div
              key={index}
              className={`py-16 px-6 text-center ${component.image_url ? 'text-white' : 'bg-slate-100'}`}
              style={component.image_url ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${component.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              <h2 className="text-3xl font-bold">{component.text || 'Call to Action Text'}</h2>
              {component.rich_content && (
                <div className="mt-2 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: component.rich_content }} />
              )}
              {component.btn_text && (
                <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg">
                  {component.btn_text}
                </button>
              )}
            </div>
          );

        case 'testimonial':
          return (
            <div key={index} className="py-16 px-6 bg-white text-center">
              <img
                src={component.image_url || 'https://placehold.co/100x100/e2e8f0/94a3b8?text=Avatar'}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <blockquote className="max-w-2xl mx-auto">
                <p className="text-lg italic text-slate-700">"{component.quote || 'Testimonial quote goes here...'}"</p>
                <footer className="mt-4">
                  <cite className="font-semibold not-italic text-slate-800">{component.author || 'Author Name'}</cite>
                  <p className="text-slate-500">{component.author_title || 'Author Title'}</p>
                </footer>
                {component.rich_content && (
                  <div className="mt-4 text-slate-600" dangerouslySetInnerHTML={{ __html: component.rich_content }} />
                )}
              </blockquote>
            </div>
          );

        case 'features':
          return (
            <div key={index} className="py-16 px-6 bg-white">
              <h2 className="text-3xl font-bold text-center mb-2">{component.title || 'Features Title'}</h2>
              {component.rich_content && (
                <div className="text-slate-600 text-center max-w-2xl mx-auto mb-10" dangerouslySetInnerHTML={{ __html: component.rich_content }} />
              )}
              {component.image_url && (
                <img src={component.image_url} className="max-w-md mx-auto mb-10 rounded-lg shadow-md" />
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
                {(component.features || []).map((feature, fIndex) => (
                  <div key={fIndex} className="text-center">
                    <div className="text-4xl text-primary-600 mb-3">⭐</div>
                    <h3 className="font-semibold text-lg text-slate-800">{feature.title || 'Feature'}</h3>
                    <p className="text-slate-600">{feature.desc || 'Description'}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-slate-800">{pageData ? 'Edit Page' : 'Add New Page'}</h3>
        <p className="text-slate-500" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
          یہاں آپ لینڈنگ پیج بنانے والے کا استعمال کرکے صفحات بنا اور ترمیم کرسکتے ہیں۔
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <label className="block text-sm font-medium text-slate-600">Title</label>
                <span className="text-xs text-slate-500" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>عنوان</span>
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm transition-shadow"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <label className="block text-sm font-medium text-slate-600">Page URL Slug</label>
                <span className="text-xs text-slate-500" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>صفحہ کا یو آر ایل</span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-sm text-slate-500 bg-slate-100 p-2 rounded-l-lg border border-r-0 border-slate-300">/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm transition-shadow"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <label className="block text-sm font-medium text-slate-600">Language</label>
                <span className="text-xs text-slate-500" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>زبان</span>
              </div>
              <select
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm transition-shadow"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

            {/* Page Builder Section */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-lg font-semibold text-slate-700">Landing Page Builder</h4>
              <p className="text-slate-500" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                اپنے صفحے کو بنانے کے لیے نیچے دیے گئے اجزاء کو شامل کریں اور ترتیب دیں۔
              </p>
              
              <div className="mt-4 space-y-4">
                {formData.components.map((component, index) => renderComponentEditor(component, index))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-700 mr-2">Add Component:</span>
                <button
                  type="button"
                  onClick={() => addComponent('hero')}
                  className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-medium"
                >
                  Hero
                </button>
                <button
                  type="button"
                  onClick={() => addComponent('features')}
                  className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-medium"
                >
                  Features
                </button>
                <button
                  type="button"
                  onClick={() => addComponent('cta')}
                  className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-medium"
                >
                  Call to Action
                </button>
                <button
                  type="button"
                  onClick={() => addComponent('testimonial')}
                  className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-medium"
                >
                  Testimonial
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h4 className="text-lg font-semibold text-slate-700">SEO / AEO</h4>
              <p className="text-slate-500" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                سرچ انجن کے لیے صفحہ کی تفصیل اور کوڈ کو بہتر بنائیں۔
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-600">Page Description (for SEO)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">SEO / AEO Auto-Generated Code</label>
                <pre className="bg-slate-900 text-white p-3 rounded-lg text-xs mt-1">
                  <code>Schema.org JSON-LD...</code>
                </pre>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 shadow-sm hover:shadow-md transition-all"
              >
                Save Page
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Preview */}
        <div>
          <h4 className="text-lg font-semibold text-slate-700 mb-4">Live Preview</h4>
          <div className="border border-slate-200 h-[70vh] overflow-y-auto rounded-xl bg-slate-50">
            {generatePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};