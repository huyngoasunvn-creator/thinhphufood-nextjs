'use client';

import React, { useEffect, useState } from 'react';
import { HomePageConfig } from '@/types';
import { INITIAL_HOME_PAGE_CONFIG } from '@/data/siteSettings';
import { Home, Save, Settings2, Sparkles } from 'lucide-react';

interface AdminHomePageConfigProps {
  config: HomePageConfig;
  onUpdate: (config: HomePageConfig) => void;
}

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 outline-none transition-all focus:ring-2 focus:ring-green-500';

const textAreaClass = `${inputClass} resize-none`;

const normalizeConfig = (config?: HomePageConfig): HomePageConfig => ({
  ...INITIAL_HOME_PAGE_CONFIG,
  ...config,
  featuredSection: {
    ...INITIAL_HOME_PAGE_CONFIG.featuredSection,
    ...(config?.featuredSection || {}),
    highlights:
      config?.featuredSection?.highlights?.length
        ? config.featuredSection.highlights
        : INITIAL_HOME_PAGE_CONFIG.featuredSection.highlights,
  },
  proofSection: {
    ...INITIAL_HOME_PAGE_CONFIG.proofSection,
    ...(config?.proofSection || {}),
    items:
      config?.proofSection?.items?.length
        ? config.proofSection.items
        : INITIAL_HOME_PAGE_CONFIG.proofSection.items,
    benefits:
      config?.proofSection?.benefits?.length
        ? config.proofSection.benefits
        : INITIAL_HOME_PAGE_CONFIG.proofSection.benefits,
  },
  trustSection: {
    ...INITIAL_HOME_PAGE_CONFIG.trustSection,
    ...(config?.trustSection || {}),
  },
  bestsellerSection: {
    ...INITIAL_HOME_PAGE_CONFIG.bestsellerSection,
    ...(config?.bestsellerSection || {}),
  },
  newsSection: {
    ...INITIAL_HOME_PAGE_CONFIG.newsSection,
    ...(config?.newsSection || {}),
  },
  topFeaturesSection: {
    ...INITIAL_HOME_PAGE_CONFIG.topFeaturesSection,
    ...(config?.topFeaturesSection || {}),
  },
});

const AdminHomePageConfig: React.FC<AdminHomePageConfigProps> = ({
  config,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<HomePageConfig>(normalizeConfig(config));

  useEffect(() => {
    setFormData(normalizeConfig(config));
  }, [config]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdate(formData);
    alert('Cập nhật cấu hình trang chủ thành công!');
  };

  const updateProofItem = (
    index: number,
    key: 'value' | 'title' | 'description',
    value: string
  ) => {
    const nextItems = [...formData.proofSection.items];
    nextItems[index] = {
      ...nextItems[index],
      [key]: value,
    };

    setFormData({
      ...formData,
      proofSection: {
        ...formData.proofSection,
        items: nextItems,
      },
    });
  };

  const updateFeaturedHighlight = (
    index: number,
    key: 'label' | 'value' | 'description',
    value: string
  ) => {
    const nextHighlights = [
      ...(formData.featuredSection.highlights?.length
        ? formData.featuredSection.highlights
        : INITIAL_HOME_PAGE_CONFIG.featuredSection.highlights),
    ];
    nextHighlights[index] = {
      ...nextHighlights[index],
      [key]: value,
    };

    setFormData({
      ...formData,
      featuredSection: {
        ...formData.featuredSection,
        highlights: nextHighlights,
      },
    });
  };

  const updateProofBenefit = (
    index: number,
    key: 'title' | 'description',
    value: string
  ) => {
    const nextBenefits = [
      ...(formData.proofSection.benefits?.length
        ? formData.proofSection.benefits
        : INITIAL_HOME_PAGE_CONFIG.proofSection.benefits),
    ];
    nextBenefits[index] = {
      ...nextBenefits[index],
      [key]: value,
    };

    setFormData({
      ...formData,
      proofSection: {
        ...formData.proofSection,
        benefits: nextBenefits,
      },
    });
  };

  const featuredHighlights =
    formData.featuredSection.highlights?.length
      ? formData.featuredSection.highlights
      : INITIAL_HOME_PAGE_CONFIG.featuredSection.highlights;

  const proofBenefits =
    formData.proofSection.benefits?.length
      ? formData.proofSection.benefits
      : INITIAL_HOME_PAGE_CONFIG.proofSection.benefits;

  return (
    <div className="max-w-5xl animate-in space-y-8 fade-in duration-500">
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center space-x-4">
          <div className="rounded-2xl bg-green-50 p-3 text-green-600">
            <Home className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Cấu hình Trang chủ</h3>
            <p className="text-sm text-slate-500">
              Chỉnh nội dung các section nổi bật, social proof và CTA trực tiếp
              trong admin.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-bold text-slate-900">Danh mục nổi bật</h4>
                
                <p className="text-sm text-slate-500">
                  Đây là khối ngay dưới hero giúp khách chọn hướng đi nhanh.
                </p>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
  <span className="text-sm font-bold text-slate-700">
    Hiển thị khối này
  </span>

  <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={formData.featuredSection.isEnabled}
    onChange={(e) =>
      setFormData({
        ...formData,
        featuredSection: {
          ...formData.featuredSection,
          isEnabled: e.target.checked,
        },
      })
    }
  />

  <div className="
    w-11 h-6 bg-gray-200 rounded-full
    peer peer-checked:bg-green-600
    transition-all
    after:content-['']
    after:absolute after:top-[2px] after:left-[2px]
    after:bg-white after:border after:rounded-full
    after:h-5 after:w-5
    after:transition-all
    peer-checked:after:translate-x-full
  "></div>
</label>
</div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Badge
                </label>
                <input
                  className={inputClass}
                  value={formData.featuredSection.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredSection: {
                        ...formData.featuredSection,
                        badge: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nút CTA
                </label>
                <input
                  className={inputClass}
                  value={formData.featuredSection.buttonText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredSection: {
                        ...formData.featuredSection,
                        buttonText: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tiêu đề
                </label>
                <textarea
                  rows={3}
                  className={textAreaClass}
                  value={formData.featuredSection.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredSection: {
                        ...formData.featuredSection,
                        title: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  className={textAreaClass}
                  value={formData.featuredSection.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredSection: {
                        ...formData.featuredSection,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Link CTA
                </label>
                <input
                  className={inputClass}
                  value={formData.featuredSection.buttonLink || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredSection: {
                        ...formData.featuredSection,
                        buttonLink: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5">
              <div className="mb-4">
                <h5 className="font-bold text-slate-900">
                  4 card thống kê bên phải của khối danh mục
                </h5>
                <p className="text-sm text-slate-500">
                  Đây là nhóm bạn khoanh ở bên phải: Dễ chọn, Sản phẩm đang bán,
                  Bài viết hữu ích, Hỗ trợ nhanh.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {featuredHighlights.map((item, index) => (
                <div
                  key={`highlight-${index}`}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green-700">
                    Card nhanh {index + 1}
                  </p>
                  <div className="space-y-3">
                    <input
                      className={inputClass}
                      placeholder="Nhãn nhỏ"
                      value={item.label}
                      onChange={(e) =>
                        updateFeaturedHighlight(index, 'label', e.target.value)
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Giá trị"
                      value={item.value}
                      onChange={(e) =>
                        updateFeaturedHighlight(index, 'value', e.target.value)
                      }
                    />
                    <textarea
                      rows={3}
                      className={textAreaClass}
                      placeholder="Mô tả ngắn"
                      value={item.description}
                      onChange={(e) =>
                        updateFeaturedHighlight(index, 'description', e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5 flex items-center gap-3">
              <Settings2 className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-bold text-slate-900">Social Proof</h4>
                <p className="text-sm text-slate-500">
                  Khối số liệu và thông điệp ngắn để trang chủ nhìn chắc và tin
                  cậy hơn.
                </p>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
  <span className="text-sm font-bold text-slate-700">
    Hiển thị khối này
  </span>

  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={formData.proofSection.isEnabled}
      onChange={(e) =>
        setFormData({
          ...formData,
          proofSection: {
            ...formData.proofSection,
            isEnabled: e.target.checked,
          },
        })
      }
    />
    <div
      className="
        relative h-6 w-11 rounded-full bg-gray-200 transition-all
        peer-checked:bg-green-600
        after:absolute after:left-[2px] after:top-[2px]
        after:h-5 after:w-5 after:rounded-full after:border after:bg-white
        after:transition-all after:content-['']
        peer-checked:after:translate-x-full
      "
    />
  </label>
</div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Badge
                </label>
                <input
                  className={inputClass}
                  value={formData.proofSection.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proofSection: {
                        ...formData.proofSection,
                        badge: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-1">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tiêu đề
                </label>
                <input
                  className={inputClass}
                  value={formData.proofSection.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proofSection: {
                        ...formData.proofSection,
                        title: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  className={textAreaClass}
                  value={formData.proofSection.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proofSection: {
                        ...formData.proofSection,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {formData.proofSection.items.map((item, index) => (
                <div
                  key={`proof-${index}`}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green-700">
                    Card {index + 1}
                  </p>
                  <div className="space-y-3">
                    <input
                      className={inputClass}
                      placeholder="Giá trị"
                      value={item.value}
                      onChange={(e) =>
                        updateProofItem(index, 'value', e.target.value)
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Tiêu đề"
                      value={item.title}
                      onChange={(e) =>
                        updateProofItem(index, 'title', e.target.value)
                      }
                    />
                    <textarea
                      rows={3}
                      className={textAreaClass}
                      placeholder="Mô tả"
                      value={item.description}
                      onChange={(e) =>
                        updateProofItem(index, 'description', e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5">
              <div className="mb-4">
                <h5 className="font-bold text-slate-900">
                  3 box lợi ích phía dưới khối xanh
                </h5>
                <p className="text-sm text-slate-500">
                  Đây là nhóm bạn khoanh ở cuối block xanh: chọn đúng loại gạo,
                  thấy nhanh điểm nổi bật, liên hệ và báo giá.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {proofBenefits.map((item, index) => (
                <div
                  key={`benefit-${index}`}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green-700">
                    Box lợi ích {index + 1}
                  </p>
                  <div className="space-y-3">
                    <input
                      className={inputClass}
                      placeholder="Tiêu đề"
                      value={item.title}
                      onChange={(e) =>
                        updateProofBenefit(index, 'title', e.target.value)
                      }
                    />
                    <textarea
                      rows={3}
                      className={textAreaClass}
                      placeholder="Mô tả"
                      value={item.description}
                      onChange={(e) =>
                        updateProofBenefit(index, 'description', e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5">
              <h4 className="font-bold text-slate-900">Khối tin cậy và CTA</h4>
              <p className="text-sm text-slate-500">
                Dùng cho phần “Vì sao khách chọn” và CTA dẫn sang giới thiệu.
              </p>
            </div>
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
  <span className="text-sm font-bold text-slate-700">
    Hiển thị khối này
  </span>

  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={formData.trustSection.isEnabled}
      onChange={(e) =>
        setFormData({
          ...formData,
          trustSection: {
            ...formData.trustSection,
            isEnabled: e.target.checked,
          },
        })
      }
    />
    <div
      className="
        relative h-6 w-11 rounded-full bg-gray-200 transition-all
        peer-checked:bg-green-600
        after:absolute after:left-[2px] after:top-[2px]
        after:h-5 after:w-5 after:rounded-full after:border after:bg-white
        after:transition-all after:content-['']
        peer-checked:after:translate-x-full
      "
    />
  </label>
</div>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                className={inputClass}
                value={formData.trustSection.badge}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trustSection: {
                      ...formData.trustSection,
                      badge: e.target.value,
                    },
                  })
                }
              />
              <input
                className={inputClass}
                value={formData.trustSection.buttonText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trustSection: {
                      ...formData.trustSection,
                      buttonText: e.target.value,
                    },
                  })
                }
              />
              <div className="md:col-span-2">
                <textarea
                  rows={3}
                  className={textAreaClass}
                  value={formData.trustSection.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trustSection: {
                        ...formData.trustSection,
                        title: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  rows={3}
                  className={textAreaClass}
                  value={formData.trustSection.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trustSection: {
                        ...formData.trustSection,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <input
                  className={inputClass}
                  value={formData.trustSection.buttonLink || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trustSection: {
                        ...formData.trustSection,
                        buttonLink: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5">
              <h4 className="font-bold text-slate-900">
                Khối bán chạy và tin tức
              </h4>
              <p className="text-sm text-slate-500">
                Cho phép đổi thông điệp mà không cần sửa code.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-green-700">
                  Sản phẩm bán chạy
                </p>
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
  <span className="text-sm font-bold text-slate-700">
    Hiển thị khối này
  </span>

  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={formData.bestsellerSection.isEnabled}
      onChange={(e) =>
        setFormData({
          ...formData,
          bestsellerSection: {
            ...formData.bestsellerSection,
            isEnabled: e.target.checked,
          },
        })
      }
    />
    <div
      className="
        relative h-6 w-11 rounded-full bg-gray-200 transition-all
        peer-checked:bg-green-600
        after:absolute after:left-[2px] after:top-[2px]
        after:h-5 after:w-5 after:rounded-full after:border after:bg-white
        after:transition-all after:content-['']
        peer-checked:after:translate-x-full
      "
    />
  </label>
</div>
                <div className="space-y-3">
                  <input
                    className={inputClass}
                    value={formData.bestsellerSection.badge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bestsellerSection: {
                          ...formData.bestsellerSection,
                          badge: e.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    rows={3}
                    className={textAreaClass}
                    value={formData.bestsellerSection.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bestsellerSection: {
                          ...formData.bestsellerSection,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    rows={3}
                    className={textAreaClass}
                    value={formData.bestsellerSection.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bestsellerSection: {
                          ...formData.bestsellerSection,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className={inputClass}
                    value={formData.bestsellerSection.buttonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bestsellerSection: {
                          ...formData.bestsellerSection,
                          buttonText: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className={inputClass}
                    value={formData.bestsellerSection.buttonLink || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bestsellerSection: {
                          ...formData.bestsellerSection,
                          buttonLink: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-green-700">
                  Tin tức trang chủ
                </p>
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
  <span className="text-sm font-bold text-slate-700">
    Hiển thị khối này
  </span>

  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={formData.newsSection.isEnabled}
      onChange={(e) =>
        setFormData({
          ...formData,
          newsSection: {
            ...formData.newsSection,
            isEnabled: e.target.checked,
          },
        })
      }
    />
    <div
      className="
        relative h-6 w-11 rounded-full bg-gray-200 transition-all
        peer-checked:bg-green-600
        after:absolute after:left-[2px] after:top-[2px]
        after:h-5 after:w-5 after:rounded-full after:border after:bg-white
        after:transition-all after:content-['']
        peer-checked:after:translate-x-full
      "
    />
  </label>
</div>
                <div className="space-y-3">
                  <input
                    className={inputClass}
                    value={formData.newsSection.badge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsSection: {
                          ...formData.newsSection,
                          badge: e.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    rows={3}
                    className={textAreaClass}
                    value={formData.newsSection.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsSection: {
                          ...formData.newsSection,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    rows={3}
                    className={textAreaClass}
                    value={formData.newsSection.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsSection: {
                          ...formData.newsSection,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className={inputClass}
                    value={formData.newsSection.buttonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsSection: {
                          ...formData.newsSection,
                          buttonText: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className={inputClass}
                    value={formData.newsSection.buttonLink || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsSection: {
                          ...formData.newsSection,
                          buttonLink: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button
              type="submit"
              className="flex items-center space-x-3 rounded-2xl bg-green-600 px-12 py-4 font-bold text-white shadow-xl shadow-green-100 transition-all hover:bg-green-700 active:scale-95"
            >
              <Save className="h-5 w-5" />
              <span>Lưu cấu hình trang chủ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHomePageConfig;
