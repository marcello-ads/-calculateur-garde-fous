import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [payingCustomers, setPayingCustomers] = useState('');
  const [grossMargin, setGrossMargin] = useState('80');
  const [paybackPeriod, setPaybackPeriod] = useState('6');
  const [targetCustomers, setTargetCustomers] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [showMarginGuide, setShowMarginGuide] = useState(false);

  const arpu = annualRevenue && payingCustomers ? 
    parseFloat(annualRevenue) / parseFloat(payingCustomers) : 0;
  
  const marginAdjustedArpu = arpu * (parseFloat(grossMargin) / 100);
  
  const targetCAC = marginAdjustedArpu * (parseFloat(paybackPeriod) / 12);
  
  const targetBasedBudget = targetCustomers && targetCAC ? 
    parseFloat(targetCustomers) * targetCAC : 0;

  const ratioARPUtoCAC = targetCAC > 0 ? arpu / targetCAC : 0;

  const fmt = (n) => Math.round(n).toLocaleString('fr-FR');

  return (
    <>
      <Head>
        <title>Calculateur de Garde-fous Financiers | Marcello Ads</title>
        <meta name="description" content="Découvre combien tu peux investir pour acquérir un client sans brûler ton cash. Outil gratuit par Marcello Ads." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎯</text></svg>" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-block',
              background: '#dcfce7',
              color: '#166534',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              ✨ Outil gratuit
            </div>
            <h1 style={{ 
              fontSize: 'clamp(24px, 6vw, 36px)', 
              fontWeight: '800', 
              color: '#0f172a',
              margin: '0 0 12px 0',
              lineHeight: '1.2'
            }}>
              Calculateur de <span style={{ color: '#059669' }}>Garde-fous</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0, padding: '0 8px' }}>
              Découvre combien tu peux investir pour acquérir un client sans brûler ton cash.
            </p>
            <a 
              href="https://instagram.com/marcello.ads" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}
            >
              by Marcello Ads →
            </a>
          </div>

          {/* Main Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}>
            
            {/* Step 1 */}
            <div style={{ padding: 'clamp(16px, 4vw, 32px)', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>1</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
                    Calcule ton ARPU
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Revenu moyen par client
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Revenu annuel total (€)
                  </label>
                  <input
                    type="number"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(e.target.value)}
                    placeholder="120000"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Nombre de clients payants
                  </label>
                  <input
                    type="number"
                    value={payingCustomers}
                    onChange={(e) => setPayingCustomers(e.target.value)}
                    placeholder="10"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {arpu > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '14px 16px',
                  background: '#eff6ff',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '13px', color: '#1e40af' }}>Ton ARPU</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a8a' }}>{fmt(arpu)} €</div>
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div style={{ padding: 'clamp(16px, 4vw, 32px)', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>2</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
                    Ajuste pour la marge brute
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Tout le revenu n'est pas disponible
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Marge brute (%)
                </label>
                <input
                  type="number"
                  value={grossMargin}
                  onChange={(e) => setGrossMargin(e.target.value)}
                  placeholder="80"
                  style={{
                    width: '120px',
                    padding: '12px 14px',
                    fontSize: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Quick margin buttons */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {[
                  { label: 'SaaS/Info', pct: '80%', value: '80' },
                  { label: 'Immobilier', pct: '65%', value: '65' },
                  { label: 'Esthétique', pct: '60%', value: '60' },
                  { label: 'Auto', pct: '10%', value: '10' },
                  { label: 'Local', pct: '40%', value: '40' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setGrossMargin(item.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: grossMargin === item.value ? '2px solid #059669' : '2px solid #e2e8f0',
                      background: grossMargin === item.value ? '#dcfce7' : 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#374151',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.label} ({item.pct})
                  </button>
                ))}
              </div>

              {/* Guide marge brute toggle */}
              <button
                onClick={() => setShowMarginGuide(!showMarginGuide)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f8fafc',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '12px'
                }}
              >
                🧮 C'est quoi la marge brute ? Comment la calculer ? {showMarginGuide ? '▲' : '▼'}
              </button>

              {showMarginGuide && (
                <div style={{
                  background: '#fef3c7',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  lineHeight: '1.6'
                }}>
                  <p style={{ margin: '0 0 12px 0', fontWeight: '700', color: '#92400e' }}>
                    📊 Qu'est-ce que la marge brute ?
                  </p>
                  <p style={{ margin: '0 0 12px 0', color: '#78350f' }}>
                    La <strong>marge brute</strong> = ce qu'il te reste après avoir payé les coûts directs liés à la production de ton service/produit. C'est l'argent réellement disponible pour couvrir tes charges fixes et financer ta croissance.
                  </p>
                  
                  <p style={{ margin: '0 0 8px 0', fontWeight: '700', color: '#92400e' }}>
                    🔢 Comment la calculer ?
                  </p>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '8px', 
                    padding: '12px', 
                    marginBottom: '12px',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}>
                    <strong>Marge brute (%) = (Revenu - Coûts directs) ÷ Revenu × 100</strong>
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', fontWeight: '700', color: '#92400e' }}>
                    💡 Exemples concrets :
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#78350f' }}>
                    <li style={{ marginBottom: '6px' }}>
                      <strong>SaaS</strong> : Tu vends un abo à 100€/mois, ton serveur coûte 5€ → Marge = 95%
                    </li>
                    <li style={{ marginBottom: '6px' }}>
                      <strong>Esthétique</strong> : Soin à 150€, produits consommés 30€, praticienne 30€ → Marge = 60%
                    </li>
                    <li style={{ marginBottom: '6px' }}>
                      <strong>Immobilier</strong> : Commission de 10 000€, frais de déplacement/pub 3 500€ → Marge = 65%
                    </li>
                    <li style={{ marginBottom: '6px' }}>
                      <strong>Concession auto</strong> : Voiture vendue 30 000€, achetée 27 000€ → Marge = 10%
                    </li>
                  </ul>
                  
                  <div style={{ 
                    background: 'linear-gradient(135deg, #fde68a, #fcd34d)', 
                    borderRadius: '8px', 
                    padding: '12px',
                    marginTop: '12px'
                  }}>
                    <p style={{ margin: 0, color: '#78350f', fontSize: '12px' }}>
                      <strong>⚠️ Ne confonds pas</strong> avec la marge nette (après toutes les charges). Ici on parle uniquement des coûts <em>directement liés</em> à chaque vente.
                    </p>
                  </div>
                </div>
              )}

              {marginAdjustedArpu > 0 && (
                <div style={{
                  padding: '14px 16px',
                  background: '#fef3c7',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '13px', color: '#92400e' }}>ARPU ajusté (après marge)</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#78350f' }}>{fmt(marginAdjustedArpu)} €</div>
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div style={{ padding: 'clamp(16px, 4vw, 32px)', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>3</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
                    Période de remboursement
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    En combien de temps récupérer l'investissement ?
                  </p>
                </div>
              </div>

              {/* Payback buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                {[
                  { value: '3', label: '3 mois', desc: 'Bootstrapé' },
                  { value: '6', label: '6 mois', desc: 'PME ⭐' },
                  { value: '12', label: '12 mois', desc: 'Entreprises' },
                  { value: '18', label: '18 mois', desc: 'Grands comptes' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setPaybackPeriod(item.value)}
                    style={{
                      padding: '14px 10px',
                      borderRadius: '10px',
                      border: paybackPeriod === item.value ? '2px solid #059669' : '2px solid #e2e8f0',
                      background: paybackPeriod === item.value ? '#dcfce7' : 'white',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Guide toggle */}
              <button
                onClick={() => setShowGuide(!showGuide)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f8fafc',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '12px'
                }}
              >
                🤔 Comment choisir ? {showGuide ? '▲' : '▼'}
              </button>

              {showGuide && (
                <div style={{
                  background: '#fffbeb',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  lineHeight: '1.6'
                }}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#78350f' }}>
                    Réponds à ces questions pour déterminer ton payback idéal :
                  </p>

                  {/* Trésorerie */}
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '10px', 
                    padding: '14px', 
                    marginBottom: '10px',
                    borderLeft: '4px solid #10b981'
                  }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                      💰 Ta trésorerie (runway)
                    </p>
                    <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                      Le runway = nombre de mois avant d'être à court de cash si tu ne génères aucun revenu supplémentaire.<br/>
                      Calcul : Trésorerie actuelle ÷ Dépenses mensuelles.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151', fontSize: '12px' }}>
                      <li><strong>Moins de 6 mois</strong> → 3 mois (récupère ton cash vite)</li>
                      <li><strong>6-12 mois</strong> → 6 mois (équilibre croissance/sécurité)</li>
                      <li><strong>12+ mois ou financé</strong> → 12-18 mois</li>
                    </ul>
                  </div>

                  {/* Modèle de revenu */}
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '10px', 
                    padding: '14px', 
                    marginBottom: '10px',
                    borderLeft: '4px solid #3b82f6'
                  }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                      📅 Ton modèle de revenu
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151', fontSize: '12px' }}>
                      <li><strong>Paiement immédiat</strong> (achat one-shot, abo mensuel) → 3-6 mois</li>
                      <li><strong>Freemium ou essai gratuit</strong> → 6-12 mois</li>
                      <li><strong>Contrats annuels/pluriannuels</strong> → 12-18 mois</li>
                    </ul>
                  </div>

                  {/* Stratégie et secteur */}
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '10px', 
                    padding: '14px', 
                    marginBottom: '10px',
                    borderLeft: '4px solid #8b5cf6'
                  }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                      🎯 Ta stratégie et ton secteur
                    </p>
                    
                    <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#475569', fontSize: '12px' }}>B2B (SaaS, services) :</p>
                    <ul style={{ margin: '0 0 10px 0', paddingLeft: '16px', color: '#374151', fontSize: '12px' }}>
                      <li>Bootstrapé → <strong>3 mois</strong></li>
                      <li>PME/startups → <strong>6 mois</strong></li>
                      <li>Entreprises → <strong>12-18 mois</strong></li>
                    </ul>

                    <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#475569', fontSize: '12px' }}>B2C (e-commerce, apps) :</p>
                    <ul style={{ margin: '0 0 10px 0', paddingLeft: '16px', color: '#374151', fontSize: '12px' }}>
                      <li>Bootstrapé → <strong>3 mois</strong></li>
                      <li>Financé, croissance modérée → <strong>6 mois</strong></li>
                      <li>Financé, conquête de marché → <strong>12+ mois</strong></li>
                    </ul>

                    <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Par secteur :</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151', fontSize: '12px' }}>
                      <li>Infopreneurs → <strong>3-6 mois</strong></li>
                      <li>Esthétique → <strong>3-6 mois</strong></li>
                      <li>Agents immo → <strong>3-6 mois</strong></li>
                      <li>Concessions → <strong>6-12 mois</strong></li>
                      <li>Business locaux → <strong>3-6 mois</strong></li>
                    </ul>
                  </div>

                  {/* Règle d'or */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
                    borderRadius: '10px', 
                    padding: '12px'
                  }}>
                    <p style={{ margin: 0, color: '#78350f', fontSize: '12px' }}>
                      <strong>💡 Règle d'or :</strong> Plus ton payback est court, moins tu prends de risques financiers, mais plus tes options de canaux d'acquisition sont limitées.
                    </p>
                  </div>
                </div>
              )}

              {/* CAC Result - The key metric */}
              {targetCAC > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #059669, #0d9488)',
                  borderRadius: '14px',
                  padding: '20px',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>🎯 TON CAC MAXIMUM</div>
                  <div style={{ fontSize: 'clamp(32px, 8vw, 42px)', fontWeight: '800' }}>{fmt(targetCAC)} €</div>
                  <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '8px' }}>
                    Maximum à dépenser par client pour rester rentable
                  </div>
                  <div style={{
                    marginTop: '14px',
                    padding: '10px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    display: 'inline-block',
                    fontSize: '13px'
                  }}>
                    Ratio ARPU:CAC = <strong>{ratioARPUtoCAC.toFixed(1)}:1</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4 - Budget */}
            <div style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>4</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
                    Ton budget en acquisition et croissance
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Estime ton investissement
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Clients ciblés (sur 3 mois)
                  </label>
                  <input
                    type="number"
                    value={targetCustomers}
                    onChange={(e) => setTargetCustomers(e.target.value)}
                    placeholder="5"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {targetBasedBudget > 0 && (
                    <div style={{
                      marginTop: '10px',
                      padding: '14px',
                      background: '#f3e8ff',
                      borderRadius: '10px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#7c3aed' }}>Budget nécessaire (3 mois)</div>
                      <div style={{ fontSize: '22px', fontWeight: '800', color: '#5b21b6' }}>{fmt(targetBasedBudget)} €</div>
                      <div style={{ fontSize: '11px', color: '#7c3aed' }}>≈ {fmt(targetBasedBudget / 3)} €/mois</div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    OU Budget mensuel (€)
                  </label>
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    placeholder="5000"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {monthlyBudget && targetCAC > 0 && (
                    <div style={{
                      marginTop: '10px',
                      padding: '14px',
                      background: '#fce7f3',
                      borderRadius: '10px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#be185d' }}>Clients acquérables/mois</div>
                      <div style={{ fontSize: '22px', fontWeight: '800', color: '#9d174d' }}>~{Math.floor(parseFloat(monthlyBudget) / targetCAC)} clients</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {arpu > 0 && targetCAC > 0 && (
            <div style={{
              marginTop: '20px',
              background: '#0f172a',
              borderRadius: '16px',
              padding: '20px',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '600' }}>
                ✨ Tes garde-fous en résumé
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>ARPU annuel</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{fmt(arpu)} €</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Marge brute</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{grossMargin}%</div>
                </div>
                <div style={{ background: 'rgba(16,185,129,0.2)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ fontSize: '11px', color: '#6ee7b7' }}>CAC Maximum</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#34d399' }}>{fmt(targetCAC)} €</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Payback</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{paybackPeriod} mois</div>
                </div>
              </div>
            </div>
          )}

          {/* Why it matters */}
          <div style={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {[
              { icon: '🎯', title: 'CAC Cible', desc: 'Combien dépenser max par client' },
              { icon: '⏱️', title: 'Payback', desc: 'Ta vitesse de réinvestissement' },
            ].map((item) => (
              <div key={item.title} style={{
                background: 'white',
                borderRadius: '14px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '4px', fontSize: '14px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Phrase résumé pour les fondateurs */}
          {arpu > 0 && targetCAC > 0 && (
            <div style={{
              marginTop: '20px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              borderRadius: '14px',
              padding: '20px',
              textAlign: 'center',
              border: '2px solid #bbf7d0'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '15px', 
                fontWeight: '600', 
                color: '#166534',
                lineHeight: '1.6'
              }}>
                💡 <strong>En résumé :</strong> Pour chaque client acquis, tu peux dépenser jusqu'à <strong>{fmt(targetCAC)} €</strong> en marketing/ventes et récupérer cet investissement en <strong>{paybackPeriod} mois</strong> grâce à tes {fmt(arpu)} € de revenu annuel par client.
              </p>
            </div>
          )}

          {/* CTA */}
          <div style={{
            marginTop: '24px',
            background: 'linear-gradient(135deg, #059669, #0d9488)',
            borderRadius: '20px',
            padding: 'clamp(24px, 6vw, 40px)',
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: '800' }}>
              🚀 Prêt à passer à l'action ?
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '15px', opacity: 0.9 }}>
              Construisons ensemble ton système d'acquisition prévisible et scalable.
            </p>
            <a
              href="https://calendly.com/marcello-sommetis/audit-gratuit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#059669',
                fontWeight: '700',
                fontSize: '16px',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none'
              }}
            >
              📅 Réserver mon audit gratuit
            </a>
            <p style={{ margin: '14px 0 0 0', fontSize: '13px', opacity: 0.8 }}>
              100% gratuit · Sans engagement
            </p>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '20px' }}>
            <a 
              href="https://instagram.com/marcello.ads" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#059669', fontSize: '13px', textDecoration: 'none' }}
            >
              Fait avec ❤️ par Marcello Ads
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
