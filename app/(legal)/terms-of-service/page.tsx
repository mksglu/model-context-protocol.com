import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Introduction and Acceptance of Terms</h2>
        <p className="mb-4">
          Welcome to MCP (model-context-protocol.com), a platform dedicated to providing a
          marketplace for Model Context Protocol (MCP) servers. Our service enables developers and
          organizations to discover, share, and manage MCP servers that connect AI assistants with
          various data sources. By accessing or using our service, you agree to be bound by these
          Terms of Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Use of the Service</h2>
        <p className="mb-4">
          MCP (model-context-protocol.com) provides a platform where users can:
        </p>
        <ul className="mb-4 list-disc pl-6">
          <li>Browse and discover MCP server implementations</li>
          <li>Share and publish their own MCP servers</li>
          <li>Access documentation and implementation guides</li>
          <li>Manage MCP server deployments and configurations</li>
        </ul>
        <p className="mb-4">
          You agree to use the service in accordance with all applicable laws and regulations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">User Accounts and Registration</h2>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Account Creation:</strong> To publish or manage MCP servers, you must create an
            account by providing accurate and complete information.
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Account Security:</strong> You are responsible for maintaining the
            confidentiality of your account credentials and for all activities under your account.
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Developer Responsibilities:</strong> When publishing MCP servers, you must
            provide accurate documentation, maintain security standards, and respond to reported
            issues.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Content and Intellectual Property Rights</h2>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Platform Rights:</strong> The model-context-protocol.com platform, including its
            interface, features, and functionality, is protected under copyright law.
            model-context-protocol.com retains all rights to the platform infrastructure.
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <strong>User Content:</strong> You retain your rights to any MCP servers you publish. By
            publishing, you grant model-context-protocol.com a license to host and distribute your
            content through our platform.
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Open Source:</strong> We encourage open-source contributions while respecting
            individual licensing choices.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Prohibited Activities</h2>
        <p className="mb-2">You agree not to:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Publish malicious or harmful MCP servers</li>
          <li>Misrepresent server capabilities or compatibility</li>
          <li>Access other users&apos; accounts without authorization</li>
          <li>Interfere with the platform&apos;s security or performance</li>
          <li>Attempt to reverse engineer the platform</li>
          <li>Use the service for any illegal purpose</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Data Collection and Privacy</h2>
        <p className="mb-2">We collect and process:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Account information</li>
          <li>MCP server metadata and configurations</li>
          <li>Usage analytics and deployment statistics</li>
          <li>Technical logs</li>
          <li>Payment information (if applicable)</li>
        </ul>
        <p className="mb-4">For complete details, see our Privacy Policy.</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Service Availability and Support</h2>
        <ul className="mb-4 list-disc pl-6">
          <li>The service is provided &quot;as is&quot; and &quot;as available&quot;</li>
          <li>Support is available via support@model-context-protocol.com</li>
          <li>We maintain a public status page for service availability</li>
          <li>We may modify or discontinue features with notice</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">MCP Server Guidelines</h2>
        <p className="mb-2">Published servers must:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Follow MCP specification standards</li>
          <li>Include proper documentation</li>
          <li>Maintain security best practices</li>
          <li>Respect data privacy requirements</li>
          <li>Include clear licensing terms</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Termination</h2>
        <p className="mb-2">We reserve the right to suspend or terminate accounts that:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Violate these terms</li>
          <li>Publish malicious or harmful servers</li>
          <li>Engage in fraudulent activity</li>
          <li>Have extended periods of inactivity</li>
          <li>Fail to maintain published servers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Disclaimer of Warranties</h2>
        <p className="mb-4">
          THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES.
          MCP.SO DISCLAIMS ALL WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
        <p className="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, MCP.SO SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE
          SERVICE OR ANY MCP SERVERS PUBLISHED THROUGH THE SERVICE.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Changes to Terms</h2>
        <p className="mb-4">
          We may update these terms at any time. Continued use of the service after changes
          constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Governing Law</h2>
        <p className="mb-4">
          These terms shall be governed by and construed in accordance with the laws of the
          jurisdiction where MCP.so operates, without regard to conflict of law principles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
        <p className="mb-4">
          For questions about these terms, please contact us at{' '}
          <a
            href="mailto:support@model-context-protocol.com"
            className="text-blue-600 hover:underline"
          >
            support@model-context-protocol.com
          </a>
          .
        </p>
      </section>

      <footer className="mt-8 border-t pt-4 text-sm text-gray-600">
        <p>
          By using model-context-protocol.com, you acknowledge that you have read and agree to these
          Terms of Service.
        </p>
      </footer>
    </div>
  );
};

export default TermsOfServicePage;
