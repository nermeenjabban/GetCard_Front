import React from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { FiBell, FiLock, FiGlobe, FiMoon } from 'react-icons/fi';
import SimpleLayout from '../components/Layout/SimpleLayout'

const Settings = () => {
  const settingsSections = [
    {
      title: 'الإشعارات',
      icon: <FiBell />,
      settings: [
        { label: 'إشعارات البريد الإلكتروني', enabled: true },
        { label: 'إشعارات الدفع', enabled: true },
        { label: 'إشعارات المهام', enabled: true },
      ]
    },
    {
      title: 'الخصوصية',
      icon: <FiLock />,
      settings: [
        { label: 'حساب خاص', enabled: false },
        { label: 'إظهار حالة الاتصال', enabled: true },
        { label: 'السماح بالوسم', enabled: true },
      ]
    },
    {
      title: 'عام',
      icon: <FiGlobe />,
      settings: [
        { label: 'اللغة', value: 'العربية' },
        { label: 'المنطقة الزمنية', value: 'Asia/Riyadh' },
        { label: 'تنسيق التاريخ', value: 'DD/MM/YYYY' },
      ]
    },
  ];

  return (
    <SimpleLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
          <p className="text-gray-600 mt-2">تخصيص إعدادات حسابك</p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section, index) => (
            <Card key={index}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600">{section.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>

                <div className="space-y-4">
                  {section.settings.map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{setting.label}</span>
                      {setting.enabled !== undefined ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      ) : (
                        <span className="text-gray-600">{setting.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}

          {/* إجراءات خطيرة */}
          <Card className="border-red-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-red-700 mb-4">إجراءات خطيرة</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-between">
                  <span>تغيير كلمة المرور</span>
                  <FiLock />
                </Button>
                <Button variant="secondary" className="w-full justify-between text-red-600 hover:text-red-700">
                  <span>حذف الحساب</span>
                  <span>⚠️</span>
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button>حفظ التغييرات</Button>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Settings;