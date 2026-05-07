# OWASP Developer Guide
---
A wayfinder for the many tools and documents provided by OWASP for developers  
Open Worldwide Application Security Project (OWASP)  
Creative Commons Attribution ShareAlike 4.0 International (CC BY-SA 4.0)
---

## Table of contents
1. Introduction
2. Foundations 
   - 2.1 Overview  
   - 2.2 Security fundamentals  
   - 2.3 Secure development and integration  
   - 2.4 Principles of security  
   - 2.5 Principles of cryptography  
   - 2.6 OWASP Top 10
     - A01:2025 Broken Access Control
     - A02:2025 Security Misconfiguration
     - A03:2025 Software Supply Chain Failures
     - A04:2025 Cryptographic Failures
     - A05:2025 Injection
     - A06:2025 Insecure Design
     - A07:2025 Authentication Failures
     - A08:2025 Software or Data Integrity Failures
     - A09:2025 Security Logging & Alerting Failures
     - A10:2025 Mishandling of Exceptional Conditions


## 1. Introduction
Welcome to the OWASP Development Guide.  
The Open Worldwide Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software. It is an open community dedicated to enabling organizations to conceive, develop, acquire, operate, and maintain applications that can be trusted.  
The purpose of this Developer Guide is to provide an introduction to security concepts and a handy reference for application / system developers. Generally it describes security practices using the advice given in the OWASP Software Assurance Maturity Model (SAMM) and describes the OWASP projects referenced in the OWASP Application Security Wayfinder project.  
This guide does not seek to replicate the many excellent sources on specific security topics; it rarely tries to go into detail on a subject and instead provides links for greater depth on these security topics. Instead the content of the Developer Guide aims to be accessible, introducing practical security concepts and providing just enough detail to get developers started on various OWASP tools and documents.  
All of the OWASP projects and tools described in this guide are free to download and use. All OWASP projects are open source; please do get involved if you are interested in improving application security.

#### Audience
Developers should use this OWASP Developer Guide to help write applications that are more secure. The guide has been written by the security community to help software developers write solid, safe and secure applications. Most of the contributors to this guide are also software developers as well as security engineers, and this helps to keep the focus developer-centric.  
If you are in a hurry and want information on a specific subject then try the OpenCRE chat LLM for immediate answers.

#### What is the Developer Guide?
You can think of this guide as a cross-reference source to the many tools and documents that OWASP provides for developers.  
Or you can regard the purpose of this guide as answering the question: “I am a developer and I need a reference guide to navigate the numerous security tools and security activities that I know I should be doing."  
Or think of it as a collection of articles that introduce developers to the wide domain of application security.  
Or you can regard this guide as a companion document to the OWASP Integration Standards project: the Application Security Wayfinder maps out the many tools, projects and documents within OWASP and the Developer Guide provides some 'wordy' context for this.

## 2. Foundations

### 2.1 Overview
There are various foundational concepts and terminology that are commonly used in software security. Although many of these concepts are complex to implement and are based on heavy-duty theory, the principles are often fairly straight forward and are accessible for every software engineer.  
A reasonable grasp of these foundational concepts allows development teams to understand and implement software security for the application or system under development. This Developer Guide can only give a brief overview of these concepts, for in-depth knowledge refer to the many texts on security such as the The Cyber Security Body Of Knowledge.  
If changes are being introduced to the security culture of an organization then make sure there is management buy-in and clear goals to achieve. Without these then attempts to improve the security posture will probably fail - see the Security Culture project for the importance of getting management, security and development teams working together.  

### 2.2 Security fundamentals
The fundamental principles of application security rely on the security concepts referenced in this developer guide. This section aims to provide an introduction to fundamental principles that any development team must be familiar with.

#### SOFTWARE ASSURANCE MATURITY MODEL
The Software Assurance Maturity Model (SAMM) provides context for the scope of software security and the foundations of good security practice:
- Governance
- Design
- Implementation
- Verification
- Operations

The SAMM model describes these foundations of software security as Business Functions, which are further divided into Business Practices. The OWASP Software Assurance Maturity Model (SAMM) is used throughout this Developer Guide; most of the sections in the Developer Guide reference at least one of the Business Functions or Practices from SAMM.

#### CIA TRIAD
Security is simply about controlling who can interact with your information, what they can do with it, and when they can interact with it. These characteristics of security can be described using the CIA triad.  
CIA stands for Confidentiality, Integrity and Availability, and it is usually depicted as a triangle representing the strong bonds between its three tenets. This triad is considered the pillars of application security, often Confidentiality, Integrity or Availability are used as a properties of data or processes within a given system. The CIA triad can be extended with the AAA triad: Authorization, Authentication and Auditing.

#### CONFIDENTIALITY
Confidentiality is the protection of data against unauthorized disclosure; it is about ensuring that only those with the correct authorization can access the data and applies to both data at rest and to data in transit. Confidentiality is also related to the broader concept of data privacy.

#### INTEGRITY
Integrity is about protecting data against unauthorized modification, or assuring data trustworthiness. The concept contains the notion of data integrity (data has not been changed accidentally or deliberately) and the notion of source integrity (data came from or was changed by a legitimate source).

#### AVAILABILITY
Availability is about ensuring the presence of information or resources. This concept relies not just on the availability of the data itself, for example by using replication of data, but also on the protection of the services that provide access to the data, for example by using load balancing.

#### AAA TRIAD
The CIA triad is often extended with Authentication, Authorization and Auditing as these are closely linked to CIA concepts. CIA has a strong dependency on Authentication and Authorization; the confidentiality and integrity of sensitive data can not be assured without them. Auditing is added as it can provide the mechanism to ensure proof of any interaction with the system.

#### AUTHENTICATION
Authentication is about confirming the identity of the entity that wants to interact with a secure system. For example the entity could be an automated client or a human actor; in either case authentication is required for a secure application.

#### AUTHORIZATION
Authorization is about specifying access rights to secure resources (data, services, files, applications, etc). These rights describe the privileges or access levels related to the resources that are being secured. Authorization is usually preceded by successful authentication.

#### AUDITING
Auditing is about keeping track of implementation-level events, as well as domain-level events taking place in a system. This helps to provide non-repudiation, which means that changes or actions on the protected system are undeniable. Auditing can provide not only technical information about the running system, but also proof that particular actions have been performed. The typical questions that are answered by auditing are "Who did What, When and potentially How?"

#### VULNERABILITIES
NIST defines a vulnerability as 'Weakness in an information system, system security procedures, internal controls, or implementation that could be exploited or triggered by a threat source.'  
There are many weaknesses or bugs in every large application, but the term vulnerability is generally reserved for those weaknesses or bugs where there is a risk that a threat actor could exploit it using a threat vector.  
Well known security vulnerabilities are:
- Clickjacking
- Credential Stuffing
- Cross-site leaks
- Denial of Service (DoS) attacks
- DOM based XSS attacks including DOM Clobbering
- IDOR (Insecure Direct Object Reference)
- Injection including OS Command injection and XXE
- LDAP specific injection attacks
- Prototype pollution
- SSRF attacks
- SQL injection and the use of Query Parameterization
- Unvalidated redirects and forwards
- XSS attacks and XSS Filter Evasion

#### HTTP AND HTML
Although not a security fundamental as such, web applications rely on HTTP communications and HTML. Both application developers and security engineers should have a good understanding of HTTP and the HTML language along with their various security controls.  
Most application development teams will be familiar with HTTP communications and the HTML standard, but if necessary refer to the training from the W3 Consortium or the W3 Schools. The OWASP Cheat Sheet Series provide web application developers with the information needed to produce secure software:
- The HTML5 Security cheat sheet describes a wide range of controls, aligned with the current HTML Living Standard
- Refer to the Securing Cascading Style Sheets cheat sheet for CSS
- The HTTP headers need to be secure, see the HTTP Security Response Headers cheat sheet
- Strongly consider HTTP Strict Transport Security
- If the application has a file upload feature, follow the File Upload cheat sheet
- Ensure content security policy is in place with the Content Security Policy cheat sheet
- Using JWTs for a Java application? Refer to the JSON Web Token cheat sheet
- Storing or sending objects? Check out the Deserialization cheat sheet


### 2.3 Secure development and integration
Secure development is described in the OWASP Software Assurance Maturity Model (SAMM) Design, Implementation and Verification business functions. Also refer to the Security Culture for a good explanation on why adding security into the software development lifecycle is important.

#### PRELUDE
The best introduction to practical secure software development is the OWASP Application Security Fragmentation article:  
Or how I worried less and stood on the shoulders of giants. - Spyros Gasteratos, Elie Saad  
Much of the material in this section is drawn from this OWASP Integration Standards project.

#### OVERVIEW
Almost all modern software is developed in an iterative manner passing through phase to phase, such as identifying customer requirements, implementation and test. These phases are revisited in a cyclic manner throughout the lifetime of the application.  
A notional Software Development LifeCycle (SDLC) is shown below, in practice there may be more or less phases according to the processes adopted by the organization.  
With the increasing number and sophistication of exploits against almost every application or business system, most companies have adopted a secure Software Development LifeCycle (SDLC). The secure SDLC should never be a separate lifecycle from an existing software development lifecycle, it must always be the same development lifecycle as before but with security actions built into each phase, otherwise security actions may well be set aside by busy development teams. Note that although the Secure SDLC could be written as 'SSDLC' it is almost always written as 'SDLC'.  
DevOps integrates and automates many of the SDLC phases and implements Continuous Integration (CI) and Continuous Delivery/Deployment (CD) pipelines to provide much of the SDLC automation.  
DevOps and pipelines have been successfully exploited with serious large scale consequences and so, in a similar manner to the SDLC, much of the DevOps actions have also had security built in to them. Secure DevOps, or DevSecOps, builds security practices into the DevOps activities to guard against attack and to provide the SDLC with automated security testing.  
Examples of how DevSecOps is 'building security in' is the provision of Interactive, Static and Dynamic Application Security Testing (IAST, SAST & DAST) and implementing supply chain security, and there are many other security activities that can be applied. Refer to the CI/CD Security Cheat Sheet for the latest DevSecOps security controls.

#### SECURE DEVELOPMENT LIFECYCLE
Referring to the OWASP Application Security Wayfinder development cycle there are four iterative phases during application development: Requirements, Design, Implementation and Verification. The other phases are done less iteratively in the development cycle but these form an equally important part of the SDLC: Gap Analysis, Metrics, Operation and Training & Culture Building.  
All of these phases of the SDLC should have security activities built into them, rather than done as separate activities. If security is built into these phases then the overhead becomes much less and the resistance from the development teams decreases. The goal is for the secure SDLC to become as familiar a process as before, with the development teams taking ownership of the security activities within each phase.

There are many OWASP tools and resources to help build security into the SDLC.
- Requirements: this phase determines the functional, non-functional and security requirements for the application. Requirements should be revisited periodically and checked for completeness and validity, and it is worth considering various OWASP tools to help with this; the Application Security Verification Standard (ASVS) provides developers with a list of requirements for secure development, the Mobile Application Security project provides a security standard for mobile applications and SecurityRAT helps identify an initial set of security requirements.
- Design: it is important to design security into the application - it is never too late to do this but the earlier the better and easier to do. OWASP provides two tools, Pythonic Threat Modeling and Threat Dragon, for threat modeling along with security gamification using Cornucopia.
- Implementation: the OWASP Top 10 Proactive Controls project states that they are "the most important control and control categories that every architect and developer should absolutely, 100% include in every project" and this is certainly good advice. Implementing these controls can provide a high degree of confidence that the application or system will be reasonably secure. OWASP provides two libraries that can be incorporated in web applications, the Enterprise Security API (ESAPI) security control library and CSRFGuard to mitigate the risk of Cross-Site Request Forgery (CSRF) attacks, that help implement these proactive controls. In addition the OWASP Cheat Sheet Series is a valuable source of information and advice on all aspects of applications security.
- Verification: OWASP provides a relatively large number of projects that help with testing and verification. This is the subject of a section in this Developer Guide, and the projects are listed at the end of this section.
- Training: development teams continually need security training. Although not part of the inner SDLC iterative loop training should still be factored into the project lifecycle. OWASP provides many training environments and materials - see the list at the end of this section.
- Culture Building: a good security culture within a business organization will help greatly in keeping the applications and systems secure. There are many activities that all add up to create the security culture, the OWASP Security Culture project goes into more detail on these activities, and a good Security Champion program within the business is foundational to a good security posture. The OWASP Security Champions Guide provides guidance and material to create security champions within the development teams - ideally every team should have a security champion that has a special interest in security and has received further training, enabling the team to build security in.
- Operations: the OWASP DevSecOps Guideline explains how to best implement a secure pipeline, using best practices and automation tools to help 'shift-left' security issues. Refer to the DevSecOps Guideline for more information on any of the topics within DevSecOps and in particular sections on Operations.
- Supply chain: attacks that leverage the supply chain can be devastating and there have been several high profile of products being successfully exploited. A Software Bill of Materials (SBOM) is the first step in avoiding these attacks and it is well worth using the OWASP CycloneDX full-stack Bill of Materials (BOM) standard for risk reduction in the supply chain. In addition the OWASP Dependency-Track project is a Continuous SBOM Analysis Platform which can help prevent these supply chain exploits by providing control of the SBOM.
- Third party dependencies: keeping track of what third party libraries are included in the application, and what vulnerabilities they have, is easily automated. Many public repositories such as github and gitlab offer this service along with some commercial vendors. OWASP provides the Dependency-Check Software Composition Analysis (SCA) tool to track external libraries.
- Application security testing: there are various types of security testing that can be automated on pull-request, merge or nightlies - or indeed manually but they are most powerful when automated. Commonly there is Static Application Security Testing (SAST), which analyzes the code without running it, and Dynamic Application Security Testing (DAST), which applies input to the application while running it in a sandbox or other isolated environments. Interactive Application Security Testing (IAST) is designed to be run manually as well as being automated, and provides instant feedback on the tests as they are run.

#### FURTHER READING FROM OWASP
- Cheat Sheet Series
- CI/CD Security Cheat Sheet
- Cornucopia
- CycloneDX Bill of Materials (BOM) standard
- DevSecOps Guideline
- Security Champions Guide
- Security Culture project
- Top 10 Proactive Controls

#### OWASP VERIFICATION PROJECTS
- Application Security Verification Standard (ASVS)
- Amass project
- Code Pulse
- Defect Dojo
- Mobile Application Security (MAS)
- Nettacker
- Offensive Web Testing Framework (OWTF)
- Web Security Testing Guide (WSTG)

#### OWASP TRAINING PROJECTS
- API Security Project (API Top 10)
- Juice Shop
- Mobile Top 10
- Security Shepherd
- Snakes And Ladders
- Top Ten Web Application security risks
- WebGoat

#### OWASP RESOURCES
- CSRFGuard library
- Dependency-Check Software Composition Analysis (SCA)
- Dependency-Track Continuous SBOM Analysis Platform
- Enterprise Security API (ESAPI)
- Integration Standards project Application Security Wayfinder
- Mobile Application Security (MAS)
- Pythonic Threat Modeling
- Threat Dragon
- SecurityRAT (Requirement Automation Tool)

### 2.4 Principles of security
This section is a very brief introduction to some concepts used within the software security domain, as these may not be familiar to many application developers. The OWASP Cheat Sheet Series provides more in depth explanations for these security principles, see the further reading at the end of this section.

#### OVERVIEW
There are various concepts and terms used in the security domain that are fundamental to the understanding and discussion of application security. Security architects and security engineers will be familiar with these terms and development teams will also need this understanding to implement secure applications.

#### SECURITY BY DESIGN
Security should not be an afterthought or add-on. When developing systems, you should begin with identifying relevant security requirements and treat them as an integral part of the overall process and system design. Begin with establishing and adopting relevant principles and policies as a foundation for your design, then build security into your development life cycle. Keep also in mind that the system you are building also will be needing maintenance and that system operators will need to securely manage and even shutdown and dispose of the system. Therefore, commit to secure operations by developing secure "operational management" principles and practices.

#### SECURITY BY DEFAULT
Secure by default means that the default configuration settings are the most secure settings possible. This is not necessarily the most user-friendly settings. Evaluate what the settings should be, based on both risk analysis and usability tests. As a result, the precise meaning is up to you to decide. Nevertheless, configure the system to only provide the least functionality and to specifically prohibit and/or restrict the use of all other functions, ports, protocols, and/or services. Also configure the defaults to be as restrictive as possible, according to best practices, without compromising the "Psychological acceptability" and "Usability and Manageability" of the system.

#### NO SECURITY GUARANTEE
One of the most important principles of software security is that no application or system is totally 100% guaranteed to be secure from all attacks. This may seem an unusually pessimistic starting point but it is merely acknowledging the real world; given enough time and enough resources any system can be compromised. The goal of software security is not '100% secure' but to make it hard enough and the rewards small enough that malicious actors look elsewhere for systems to exploit.

#### DEFENSE IN DEPTH
Also known as layered defense, defense in depth is a security principle where defense against attack is provided by multiple security controls. The aim is that single points of complete compromise are eliminated or mitigated by the incorporation of a series or multiple layers of security safeguards and risk-mitigation countermeasures.  
If one layer of defense turns out to be inadequate then, if diverse defensive strategies are in place, another layer of defense may prevent a full breach and if that one is circumvented then the next layer may block the exploit.

#### FAIL SAFE
This is a security principle that aims to maintain confidentiality, integrity and availability when an error condition is detected. These error conditions may be a result of an attack, or may be due to design or implementation failures, in any case the system / applications should default to a secure state rather than an unsafe state.  
For example unless an entity is given explicit access to an object, it should be denied access to that object by default. This is often described as 'Fail Safe Defaults' or 'Secure by Default'.  
In the context of software security, the term 'fail secure' is commonly used interchangeably with fail safe, which comes from physical security terminology. Failing safe also helps software resiliency in that the system / application can rapidly recover upon design or implementation flaws.

#### LEAST PRIVILEGE
A security principle in which a person or process is given only the minimum level of access rights (privileges) that is necessary for that person or process to complete an assigned operation. This right must be given only for a minimum amount of time that is necessary to complete the operation.  
This helps to limits the damage when a system is compromised by minimizing the ability of an attacker to escalate privileges both laterally or vertically. In order to apply this principle of least privilege proper granularity of privileges and permissions should be established.

#### COMPARTMENTALIZE
The principle of least privilege works better if access rights are not an "all or nothing" access model. Instead, compartmentalize the access to information on a "need-to-know" basis in order to perform certain tasks. The compartmentalization principle helps in minimizing the impact of a security breach in case of a successful breach attempt but must be used in moderation in order to prevent the system from becoming unmanageable. Therefore, follow also the principle of "Economy of Mechanism".

#### SEPARATION OF DUTIES
Also known as separation of privilege, separation of duties is a security principle which requires that the successful completion of a single task is dependent upon two or more conditions that are insufficient, individually by themselves, for completing the task. There are many applications for this principle, for example limiting the damage an aggrieved or malicious insider can do, or by limiting privilege escalation.

#### ECONOMY OF MECHANISM
Also known as 'keep it simple', if there are multiple implementations then the simplest and most easily understood implementation should be chosen.  
The likelihood of vulnerabilities increases with the complexity of the software architectural design and code, and increases further if it is hard to follow or review the code. The attack surface of the software is reduced by keeping the software design and implementation details simple and understandable.

#### COMPLETE MEDIATION
A security principle that ensures that authority is not circumvented in subsequent requests of an object by a subject, by checking for authorization (rights and privileges) upon every request for the object.  
In other words, the access requests by a subject for an object are completely mediated every time, so that all accesses to objects must be checked to ensure that they are allowed.

#### OPEN DESIGN
The open design security principle states that the implementation details of the design should be independent of the design itself, allowing the design to remain open while the implementation can be kept secret. This is in contrast to security by obscurity where the security of the software is dependent upon the obscuring of the design itself.  
When software is architected using the open design concept, the review of the design itself will not result in the compromise of the safeguards in the software.

#### LEAST COMMON MECHANISM
The security principle of least common mechanisms disallows the sharing of mechanisms that are common to more than one user or process if the users or processes are at different levels of privilege. This is important when defending against privilege escalation.

#### PSYCHOLOGICAL ACCEPTABILITY
A security principle that aims at maximizing the usage and adoption of the security functionality in the software by ensuring that the security functionality is easy to use and at the same time transparent to the user. Ease of use and transparency are essential requirements for this security principle to be effective.  
Security controls should not make the resource significantly more difficult to access than if the security control were not present. If a security control provides too much friction for the users then they may look for ways to defeat the control and “prop the doors open”.

#### USABILITY AND MANAGEABILITY
Is a principle related to psychological acceptability, but goes beyond just the perceived psychological acceptability to also include the design, implementation and operation of security controls. The configuration, administration and integration of security components should not be overly complex or obscure. Therefore, always use open standards for portability and interoperability, use common language in developing security requirements, design security to allow for regular adoption of new technology, ensure a secure and logical upgrade process exist, automate security management activities and strive for operational ease of use.

#### SECURE THE WEAKEST LINK
This security principle states that the resiliency of your software against hacker attempts will depend heavily on the protection of its weakest components, be it the code, service or an interface. Therefore, identifying the weakest component and addressing the most serious risk first, until an acceptable level of risk is attained, is considered good security practice.

#### LEVERAGING EXISTING COMPONENTS
This is a security principle that focuses on ensuring that the attack surface is not increased and no new vulnerabilities are introduced by promoting the reuse of existing software components, code and functionality.  
Existing components are more likely to be tried and tested, and hence more secure, and also should have security patches available. In addition components developed within the open source community have the further benefit of 'many eyes' and are therefore likely to be even more secure.

### 2.5 Principles of cryptography
Cryptography is fundamental to the Confidentiality and Integrity of applications and systems. The OWASP Cheat Sheet series describes the use of cryptography and some of these are listed in the further reading at the end of this section.

#### OVERVIEW
This section provides a brief introduction to cryptography (often simply referred to as "crypto") and the terms used.  
Cryptography is a large subject and can get very mathematical, but fortunately for the majority of development teams a general understanding of the concepts is sufficient. This general understanding, with the guidance of security architects, should allow implementation of cryptography by the development team for the application or system.

#### USES OF CRYPTOGRAPHY
Although cryptography was initially restricted primarily to the military and the realm of academia, cryptography has become ubiquitous in securing software applications. Common every day uses of cryptography include mobile phones, passwords, SSL VPNs, smart cards, and DVDs. Cryptography has permeated through everyday life, and is heavily used by many web applications.  
Cryptography is one of the more advanced topics of information security, and one whose understanding requires the most schooling and experience. It is difficult to get right because there are many approaches to encryption, each with advantages and disadvantages that need to be thoroughly understood by solution architects.  
The proper and accurate implementation of cryptography is extremely critical to its efficacy. A small mistake in configuration or coding will result in removing most of the protection and rending the crypto implementation useless.  
A good understanding of crypto is required to be able to discern between solid products and snake oil. The inherent complexity of crypto makes it easy to fall for fantastic claims from vendors about their product. Typically, these are "a breakthrough in cryptography" or "unbreakable" or provide "military grade" security. If a vendor says "trust us, we have had experts look at this," chances are they weren't experts!

#### CONFIDENTIALITY
For the purposes of this section, confidentiality is defined as "no unauthorized disclosure of information". Cryptography addresses this via encryption of either the data at rest or data in transit by protecting the information from all who do not hold the decryption key. Cryptographic hashes (secure, one way hashes) to prevent passwords from disclosure.

#### AUTHENTICATION
Authentication is the process of verifying a claim that a subject is who it says it is via some provided corroborating evidence. Cryptography is central to authentication:
- to protect the provided corroborating evidence (for example hashing of passwords for subsequent storage)
- in authentication protocols often use cryptography to either directly authenticate entities or to exchange credentials in a secure manner
- to verify the identity one or both parties in exchanging messages, for example identity verification within Transport Layer Security (TLS)

OpenID Connect is widely used as an identity layer on top of the OAuth 2.0 protocol, see the OAuth 2.0 Protocol Cheat Sheet.

#### INTEGRITY
Integrity ensures that even authorized users have performed no accidental or malicious alternation of information. Cryptography can be used to prevent tampering by means of Message Authentication Codes (MACs) or digital signatures.  
The term 'message authenticity' refers to ensuring the integrity of information, often using symmetric encryption and shared keys, but does not authenticate the sending party.  
The term 'authenticated encryption' also ensures the integrity of information, and, if asymmetric encryption is used, can authenticate the sender.

#### NON-REPUDIATION
Non-repudiation of sender ensures that someone sending a message should not be able to deny later that they have sent it. Non-repudiation of receiver means that the receiver of a message should not be able to deny that they have received it. Cryptography can be used to provide non-repudiation by providing unforgeable messages or replies to messages.  
Non-repudiation is useful for financial, e-commerce, and contractual exchanges. It can be accomplished by having the sender or recipient digitally sign some unique transactional record.

#### ATTESTATION
Attestation is the act of "bearing witness" or certifying something for a particular use or purpose. Attestation is generally discussed in the context of a Trusted Platform Module (TPM), Digital Rights Management (DRM), and UEFI Secure Boot.  
For example, Digital Rights Management is interested in attesting that your device or system hasn't been compromised with some back-door to allow someone to illegally copy DRM-protected content.  
Cryptography can be used to provide a chain of evidence that everything is as it is expected to be, to prove to a challenger that everything is in accordance with the challenger's expectations. For example, remote attestation can be used to prove to a challenger that you are indeed running the software that you claim that you are running. Most often attestation is done by providing a chain of digital signatures starting with a trusted (digitally signed) boot loader.

#### CRYPTOGRAPHIC HASHES
Cryptographic hashes, also known as message digests, are functions that map arbitrary length bit strings to some fixed length bit string known as the 'hash value' or 'digest value'. These hash functions are many-to-one mappings that are compression functions.  
Cryptographic hash functions are used to provide data integrity (i.e., to detect intentional data tampering), to store passwords or pass phrases, and to provide digital signatures in a more efficient manner than using asymmetric ciphers. Cryptographic hash functions are also used to extend a relatively small bit of entropy so that secure random number generators can be constructed.  
When used to provide data integrity, cryptographic functions provide two types of integrity: keyed hashes, often called 'message authentication codes', and unkeyed hashes called 'message integrity codes'.

#### CIPHERS
A cipher is an algorithm that performs encryption or decryption. Modern ciphers can be categorized in a couple of different ways. The most common distinctions between them are:
- Whether they work on fixed size number of bits (block ciphers) or on a continuous stream of bits (stream ciphers)
- Whether the same key is used for both encryption and decryption (symmetric ciphers) or separate keys for encryption and decryption (asymmetric ciphers)

#### SYMMETRIC CIPHERS
Symmetric ciphers encrypt and decrypt using the same key. This implies that if one party encrypts data that a second party must decrypt, those two parties must share a common key.  
Symmetric ciphers come in two main types:
1. Block ciphers, which operate on a block of characters (typically 8 or 16 octets) at a time. An example of a block cipher is AES
2. Stream ciphers, which operate on a single bit (or occasionally a single byte) at a time. Examples of a stream ciphers are RC4 (aka, ARC4) and Salsa20

Note that all block ciphers can also operate in 'streaming mode' by selecting the appropriate cipher mode.

#### CIPHER MODES
Block ciphers can function in different modes of operations known as "cipher modes". This cipher mode algorithmically describes how a cipher operates to repeatedly apply its encryption or decryption mechanism to a given cipher block. Cipher modes are important because they have an enormous impact on both the confidentiality and the message authenticity of the resulting ciphertext messages.  
Almost all cryptographic libraries support the four original DES cipher modes of ECB, CBC (Cipher Block Chaining) OFB (Output Feedback), and CFB (Cipher Feedback). Many also support CTR (Counter) mode.

#### INITIALIZATION VECTOR
A cryptographic initialization vector (IV) is a fixed size input to a block cipher's encryption / decryption primitive. The IV is recommended (and in many cases, required) to be random or at least pseudo-random.

#### PADDING
Except when they are operating in a streaming mode, block ciphers generally operate on fixed size blocks. These block ciphers must also operate on messages of any size, not just those that are an integral multiple of the cipher's block size, and so the message can be padded to fit into the next fixed-size block.

#### ASYMMETRIC CIPHERS
Asymmetric ciphers encrypt and decrypt with two different keys. One key generally is designated as the private key and the other is designated as the public key. Generally the public key is widely shared and the private key is kept secure.  
Asymmetric ciphers are several orders of magnitude slower than symmetric ciphers. For this reason they are used frequently in hybrid cryptosystems, which combine asymmetric and symmetric ciphers. In such hybrid cryptosystems, a random symmetric session key is generated which is only used for the duration of the encrypted communication. This random session key is then encrypted using an asymmetric cipher and the recipient's private key. The plaintext data itself is encrypted with the session key. Then the entire bundle (encrypted session key and encrypted message) is all sent together. Both TLS and S/MIME are common cryptosystems using hybrid cryptography.

#### DIGITAL SIGNATURE
Digital signatures are a cryptographically unique data string that is used to ensure data integrity and prove the authenticity of some digital message, and that associates some input message with an originating entity. A digital signature generation algorithm is a cryptographically strong algorithm that is used to generate a digital signature.

#### KEY AGREEMENT PROTOCOL
Key agreement protocols are protocols whereby N parties (usually two) can agree on a common key without actually exchanging the key. When designed and implemented properly, key agreement protocols prevent adversaries from learning the key or forcing their own key choice on the participating parties.

#### APPLICATION LEVEL ENCRYPTION
Application level encryption refers to encryption that is considered part of the application itself; it implies nothing about where in the application code the encryption is actually done.

#### KEY DERIVATION
A key derivation function (KDF) is a deterministic algorithm to derive a key of a given size from some secret value. If two parties use the same shared secret value and the same KDF, they should always derive exactly the same key.

#### KEY WRAPPING
Key wrapping is a construction used with symmetric ciphers to protect cryptographic key material by encrypting it in a special manner. Key wrap algorithms are intended to protect keys while held in untrusted storage or while transmitting keys over insecure communications networks.

#### KEY EXCHANGE ALGORITHMS
Key exchange algorithms (also referred to as key establishment algorithms) are protocols that are used to exchange secret cryptographic keys between a sender and receiver in a manner that meets certain security constraints. Key exchange algorithms attempt to address the problem of securely sharing a common secret key with two parties over an insecure communication channel in a manner that no other party can gain access to a copy of the secret key.  
The most familiar key exchange algorithm is Diffie-Hellman Key Exchange. There are also password authenticated key exchange algorithms. RSA key exchange using PKI or webs-of-trust or trusted key servers are also commonly used.

#### KEY TRANSPORT PROTOCOLS
Key Transport protocols are where one party generates the key and sends it securely to the recipient(s).

#### KEY AGREEMENT PROTOCOLS
Key Agreement protocols are protocols whereby N parties (usually two) can agree on a common key with all parties contributing to the key value. These protocols prevent adversaries from learning the key or forcing their own key choice on the participating parties.

### 2.6 OWASP Top 10
The OWASP Top Ten is a very well known list of web application security risks, and is included by the OWASP Software Assurance Maturity Model (SAMM) in the Education & Guidance practice within the Governance business function.

#### OVERVIEW
The OWASP Top 10 Web Application Security Risks project is probably the most well known security concept within the security community, achieving wide spread acceptance and fame soon after its release in 2003. Often referred to as just the 'OWASP Top Ten', it is a list that identifies the most important threats to web applications and seeks to rank them in importance and severity.  
The list has changed over time, with some threat types becoming more of a problem to web applications and other threats becoming less of a risk as technologies change. The latest version was issued in 2021 and each category is summarized below.  
Note that there are various 'OWASP Top Ten' projects, for example the 'OWASP Top 10 for Large Language Model Applications', so to avoid confusion the context should be noted when referring to these lists.

#### A01:2025 BROKEN ACCESS CONTROL

##### Background
Maintaining its position at #1 in the Top Ten, 100% of the applications tested were found to have some form of broken access control. Notable CWEs included are CWE-200: Exposure of Sensitive Information to an Unauthorized Actor, CWE-201: Exposure of Sensitive Information Through Sent Data, CWE-918 Server-Side Request Forgery (SSRF), and CWE-352: Cross-Site Request Forgery (CSRF). This category has the highest number of occurrences in the contributed data, and second highest number of related CVEs.

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 40 | 20.15% | 3.74% | 100.00% | 42.93% | 7.04 | 3.84 | 1,839,701 | 32,654 |

##### Description
Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification or destruction of all data, or performing a business function outside the user's limits. Common access control vulnerabilities include:

- Violation of the principle of least privilege, commonly known as deny by default, where access should only be granted for particular capabilities, roles, or users, but is available to anyone.
- Bypassing access control checks by modifying the URL (parameter tampering or force browsing), internal application state, or the HTML page, or by using an attack tool that modifies API requests.
- Permitting viewing or editing someone else's account by providing its unique identifier (insecure direct object references)
- An accessible API with missing access controls for POST, PUT, and DELETE.
- Elevation of privilege. Acting as a user without being logged in or gaining privileges beyond those expected of the logged in user (e.g. admin access).
- Metadata manipulation, such as replaying or tampering with a JSON Web Token (JWT) access control token, a cookie or a hidden field manipulated to elevate privileges, or abusing JWT invalidation.
- CORS misconfiguration allows API access from unauthorized or untrusted origins.
- Force browsing (guessing URLs) to authenticated pages as an unauthenticated user or to privileged pages as a standard user.

##### How to prevent
Access control is only effective when implemented in trusted server-side code or serverless APIs, where the attacker cannot modify the access control check or metadata.

- Except for public resources, deny by default.
- Implement access control mechanisms once and reuse them throughout the application, including minimizing Cross-Origin Resource Sharing (CORS) usage.
- Model access controls should enforce record ownership rather than allowing users to create, read, update, or delete any record.
- Unique application business limit requirements should be enforced by domain models.
- Disable web server directory listing and ensure file metadata (e.g., .git) and backup files are not present within web roots.
- Log access control failures, alert admins when appropriate (e.g., repeated failures).
- Implement rate limits on API and controller access to minimize the harm from automated attack tooling.
- Stateful session identifiers should be invalidated on the server after logout. Stateless JWT tokens should be short-lived to minimize the window of opportunity for an attacker. For longer-lived JWTs, consider using refresh tokens and following OAuth standards to revoke access.
- Use well-established toolkits or patterns that provide simple, declarative access controls.

Developers and QA staff should include functional access control in their unit and integration tests.

##### Example attack scenarios

**Scenario #1:** The application uses unverified data in an SQL call that is accessing account information:
```
pstmt.setString(1, request.getParameter("acct"));
ResultSet results = pstmt.executeQuery();
```
An attacker can simply modify the browser's 'acct' parameter to send any desired account number. If not correctly verified, the attacker can access any user's account.
```
https://example.com/app/accountInfo?acct=notmyacct
```

**Scenario #2:** An attacker simply forces browsers to target URLs. Admin rights are required for access to the admin page.
```
https://example.com/app/getappInfo
https://example.com/app/admin_getappInfo
```
If an unauthenticated user can access either page, it's a flaw. If a non-admin can access the admin page, this is a flaw.

**Scenario #3:** An application puts all of their access control in their front-end. While the attacker cannot get to `https://example.com/app/admin_getappInfo` due to JavaScript code running in the browser, they can simply execute
```
$ curl https://example.com/app/admin_getappInfo 
```
from the command line.

#### A02:2025 SECURITY MISCONFIGURATION

##### Background
Moving up from #5 in the previous edition, 100% of the applications tested were found to have some form of misconfiguration, with an average incidence rate of 3.00%, and over 719k occurrences of a Common Weakness Enumeration (CWE) in this risk category. With more shifts into highly configurable software, it's not surprising to see this category moving up. Notable CWEs included are CWE-16 Configuration and CWE-611 Improper Restriction of XML External Entity Reference (XXE).

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 16 | 27.70% | 3.00% | 100.00% | 52.35% | 7.96 | 3.97 | 719,084 | 1,375 |

##### Description
Security misconfiguration is when a system, application, or cloud service is set up incorrectly from a security perspective, creating vulnerabilities.

The application might be vulnerable if:

- It is missing appropriate security hardening across any part of the application stack or improperly configured permissions on cloud services.
- Unnecessary features are enabled or installed (e.g., unnecessary ports, services, pages, accounts, testing frameworks, or privileges).
- Default accounts and their passwords are still enabled and unchanged.
- A lack of central configuration for intercepting excessive error messages. Error handling reveals stack traces or other overly informative error messages to users.
- For upgraded systems, the latest security features are disabled or not configured securely.
- Excessive prioritization of backward compatibility leading to insecure configuration.
- The security settings in the application servers, application frameworks (e.g., Struts, Spring, ASP.NET), libraries, databases, etc., are not set to secure values.
- The server does not send security headers or directives, or they are not set to secure values.

Without a concerted, repeatable application security configuration hardening process, systems are at a higher risk.

##### How to prevent
Secure installation processes should be implemented, including:

- A repeatable hardening process enabling the fast and easy deployment of another environment that is appropriately locked down. Development, QA, and production environments should all be configured identically, with different credentials used in each environment. This process should be automated to minimize the effort required to set up a new secure environment.
- A minimal platform without any unnecessary features, components, documentation, or samples. Remove or do not install unused features and frameworks.
- A task to review and update the configurations appropriate to all security notes, updates, and patches as part of the patch management process (see A03 Software Supply Chain Failures). Review cloud storage permissions (e.g., S3 bucket permissions).
- A segmented application architecture provides effective and secure separation between components or tenants, with segmentation, containerization, or cloud security groups (ACLs).
- Sending security directives to clients, e.g., Security Headers.
- An automated process to verify the effectiveness of the configurations and settings in all environments.
- Proactively add a central configuration to intercept excessive error messages as a backup.
- If these verifications are not automated, they should be manually verified annually at a minimum.
- Use identity federation, short-lived credentials, or role-based access mechanisms provided by the underlying platform instead of embedding static keys or secrets in code, configuration files, or pipelines.

##### Example attack scenarios
**Scenario #1:** The application server comes with sample applications not removed from the production server. These sample applications have known security flaws that attackers use to compromise the server. Suppose one of these applications is the admin console, and default accounts weren't changed. In that case, the attacker logs in with the default password and takes over.

**Scenario #2:** Directory listing is not disabled on the server. An attacker discovers they can simply list directories. The attacker finds and downloads the compiled Java classes, which they decompile and reverse engineer to view the code. The attacker then finds a severe access control flaw in the application.

**Scenario #3:** The application server's configuration allows detailed error messages, such as stack traces to be returned to users. This potentially exposes sensitive information or underlying flaws, such as component versions that are known to be vulnerable.

**Scenario #4:** A cloud service provider (CSP) defaults to having sharing permissions open to the Internet. This allows sensitive data stored within cloud storage to be accessed.

#### A03:2025 SOFTWARE SUPPLY CHAIN FAILURES
##### Background
This was top-ranked in the Top 10 community survey with exactly 50% respondents ranking it #1. Since initially appearing in the 2013 Top 10 as "A9 – Using Components with Known Vulnerabilities", the risk has grown in scope to include all supply chain failures, not just ones involving known vulnerabilities. Despite this increased scope, supply chain failures continue to be a challenge to identify with only 11 Common Vulnerability and Exposures (CVEs) having the related CWEs. However, when tested and reported in the contributed data, this category has the highest average incidence rate at 5.19%. The relevant CWEs are CWE-477: Use of Obsolete Function, CWE-1104: Use of Unmaintained Third Party Components, CWE-1329: Reliance on Component That is Not Updateable, and CWE-1395: Dependency on Vulnerable Third-Party Component.

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 6 | 9.56% | 5.72% | 65.42% | 27.47% | 8.17 | 5.23 | 215,248 | 11 |

##### Description
Software supply chain failures are breakdowns or other compromises in the process of building, distributing, or updating software. They are often caused by vulnerabilities or malicious changes in third-party code, tools, or other dependencies that the system relies on.

You are likely vulnerable if:
- you do not carefully track the versions of all components that you use (both client-side and server-side). This includes components you directly use as well as nested (transitive) dependencies.
- the software is vulnerable, unsupported, or out of date. This includes the OS, web/application server, database management system (DBMS), applications, APIs and all components, runtime environments, and libraries.
- you do not scan for vulnerabilities regularly and subscribe to security bulletins related to the components you use.
- you do not have a change management process or tracking of changes within your supply chain, including tracking IDEs, IDE extensions and updates, changes to your organization's code repository, sandboxes, image and library repositories, the way artifacts are created and stored, etc. Every part of your supply chain should be documented, especially changes.
- you have not hardened every part of your supply chain, with a special focus on access control and the application of least privilege.
- your supply chain systems do not have any separation of duty. No single person should be able to write code and promote it all the way to production without oversight from another human being.
- components from untrusted sources, across any part of the tech stack, are used in or can impact on production environments.
- you do not fix or upgrade the underlying platform, frameworks, and dependencies in a risk-based, timely fashion. This commonly happens in environments when patching is a monthly or quarterly task under change control, leaving organizations open to days or months of unnecessary exposure before fixing vulnerabilities.
- software developers do not test the compatibility of updated, upgraded, or patched libraries.
- you do not secure the configurations of every part of your system (see A02:2025-Security Misconfiguration).
- your CI/CD pipeline has weaker security than the systems it builds and deploys, especially if it is complex.

##### How to prevent
There should be a patch management process in place to:

- Centrally generate and manage the Software Bill of Materials (SBOM) of your entire software.
- Track not just your direct dependencies, but their (transitive) dependencies, and so on.
- Reduce attack surface by removing unused dependencies, unnecessary features, components, files, and documentation.
- Continuously inventory the versions of both client-side and server-side components (e.g., frameworks, libraries) and their dependencies using tools like OWASP Dependency Track, OWASP Dependency Check, retire.js, etc.
- Continuously monitor sources like Common Vulnerability and Exposures (CVE), National Vulnerability Database (NVD), and Open Source Vulnerabilities (OSV) for vulnerabilities in the components you use. Use software composition analysis, software supply chain, or security-focused SBOM tools to automate the process. Subscribe to alerts for security vulnerabilities related to components you use.
- Only obtain components from official (trusted) sources over secure links. Prefer signed packages to reduce the chance of including a modified, malicious component (see A08:2025-Software and Data Integrity Failures).
- Deliberately choose which version of a dependency you use and upgrade only when there is need.
- Monitor for libraries and components that are unmaintained or do not create security patches for older versions. If patching is not possible, consider migrating to an alternative. If that is not possible, consider deploying a virtual patch to monitor, detect, or protect against the discovered issue.
- Update your CI/CD, IDE, and any other developer tooling regularly
- Avoid deploying updates to all systems simultaneously. Use staged rollouts or canary deployments to limit exposure in case a trusted vendor is compromised.

There should be a change management process or tracking system in place to track changes to:

- CI/CD settings (all build tools and pipelines)
- Code repositories
- Sandbox areas
- Developer IDEs
- SBOM tooling, and created artifacts
- Logging systems and logs
- Third party integrations, such as SaaS
- Artifact repositories
- Container registries

Harden the following systems, which includes enabling MFA and locking down IAM:

- Your code repository (which includes not checking in secrets, protecting branches, backups)
- Developer workstations (regular patching, MFA, monitoring, and more)
- Your build server & CI/CD (separation of duties, access control, signed builds, environment-scoped secrets, tamper-evident logs, more)
- Your artifacts (ensure integrity via provenance, signing, and time stamping, promote artifacts rather than rebuilding for each environment, ensure builds are immutable)
- Infrastructure as code (managed like all code, including use of PRs and version control)

Every organization must ensure an ongoing plan for monitoring, triaging, and applying updates or configuration changes for the lifetime of the application or portfolio.

##### Example attack scenarios
**Scenario #1:** A trusted vendor is compromised with malware, leading to your computer systems being compromised when you upgrade. The most famous example of this is probably:

- The 2019 SolarWinds compromise that led to ~18,000 organizations being compromised.

**Scenario #2:** A trusted vendor is compromised such that it behaves maliciously only under a specific condition.

- The 2025 Bybit theft of $1.5 billion was caused by a supply chain attack in wallet software that only executed when the target wallet was being used.

**Scenario #3:** The Shai-Hulud supply chain attack in 2025 was the first successful self-propagating npm worm. Attacks seeded malicious versions of popular packages, which used a post-install script to harvest and exfiltrate sensitive data to public GitHub repositories. The malware would also detect npm tokens in the victim environment, and automatically use them to push malicious versions of any accessible package. The worm reached over 500 package versions before being disrupted by npm. This supply chain attack was advanced, fast-spreading, and damaging, and by targeting developer machines it demonstrated developers themselves are now prime targets for supply chain attacks.

**Scenario #4:** Components typically run with the same privileges as the application itself, so flaws in any component can result in serious impact. Such flaws can be accidental (e.g., coding error) or intentional (e.g., a backdoor in a component). Some example exploitable component vulnerabilities discovered are:

- CVE-2017-5638, a Struts 2 remote code execution vulnerability that enables the execution of arbitrary code on the server, has been blamed for significant breaches.
- CVE-2021-44228 ("Log4Shell"), an Apache Log4j remote code execution zero-day vulnerability, has been blamed for ransomware, cryptomining, and other attack campaigns.

#### A04:2025 CRYPTOGRAPHIC FAILURES

##### Background
Moving down two positions to #4, this weakness focuses on failures related to the lack of cryptography, insufficiently strong cryptography, leaking of cryptographic keys, and related errors. Three of the most common Common Weakness Enumerations (CWEs) in this risk involved the use of a weak pseudo-random number generator: CWE-327 Use of a Broken or Risky Cryptographic Algorithm, CWE-331: Insufficient Entropy, CWE-1241: Use of Predictable Algorithm in Random Number Generator, and CWE-338 Use of Cryptographically Weak Pseudo-Random Number Generator (PRNG).

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 32 | 13.77% | 3.80% | 100.00% | 47.74% | 7.23 | 3.90 | 1,665,348 | 2,185 |

##### Description
Generally speaking, all data in transit should be encrypted at the transport layer (OSI layer 4). Previous hurdles such as CPU performance and private key/certificate management are now handled by CPUs having instructions designed to accelerate encryption (e.g., AES support) and private key and certificate management being simplified by services like LetsEncrypt.org with major cloud vendors providing even more tightly integrated certificate management services for their specific platforms.

Beyond securing the transport layer, it is important to determine what data needs encryption at rest as well as what data needs extra encryption in transit (at the application layer, OSI layer 7). For example, passwords, credit card numbers, health records, personal information, and business secrets require extra protection, especially if that data falls under privacy laws, e.g., EU's General Data Protection Regulation (GDPR), or regulations such as PCI Data Security Standard (PCI DSS). For all such data:

- Are any old or weak cryptographic algorithms or protocols used either by default or in older code?
- Are default crypto keys in use, are weak crypto keys generated, are keys re-used, or is proper key management and rotation missing?
- Are crypto keys checked into source code repositories?
- Is encryption not enforced, e.g., are any HTTP headers (browser) security directives or headers missing?
- Is the received server certificate and the trust chain properly validated?
- Are initialization vectors ignored, reused, or not generated sufficiently secure for the cryptographic mode of operation? Is an insecure mode of operation such as ECB in use? Is encryption used when authenticated encryption is more appropriate?
- Are passwords being used as cryptographic keys in the absence of a password based key derivation function?
- Is randomness used that was not designed to meet cryptographic requirements? Even if the correct function is chosen, does it need to be seeded by the developer, and if not, has the developer over-written the strong seeding functionality built into it with a seed that lacks sufficient entropy/unpredictability?
- Are deprecated hash functions such as MD5 or SHA1 in use, or are non-cryptographic hash functions used when cryptographic hash functions are needed?
- Are cryptographic error messages or side channel information exploitable, for example in the form of padding oracle attacks?
- Can the cryptographic algorithm be downgraded or bypassed?

See references ASVS: Cryptography (V11), Secure Communication (V12) and Data Protection (V14).

##### How to prevent
Do the following, at a minimum, and consult the references:

- Classify and label data processed, stored, or transmitted by an application. Identify which data is sensitive according to privacy laws, regulatory requirements, or business needs.
- Store your most sensitive keys in a hardware or cloud-based HSM.
- Use well-trusted implementations of cryptographic algorithms whenever possible.
- Don't store sensitive data unnecessarily. Discard it as soon as possible or use PCI DSS compliant tokenization or even truncation. Data that is not retained cannot be stolen.
- Make sure to encrypt all sensitive data at rest.
- Ensure up-to-date and strong standard algorithms, protocols, and keys are in place; use proper key management.
- Encrypt all data in transit with protocols >= TLS 1.2 only, with forward secrecy (FS) ciphers, drop support for cipher block chaining (CBC) ciphers, support quantum key change algorithms. For HTTPS enforce encryption using HTTP Strict Transport Security (HSTS). Check everything with a tool.
- Disable caching for responses that contain sensitive data. This includes caching in your CDN, web server, and any application caching (e.g., Redis).
- Apply required security controls as per the data classification.
- Do not use unencrypted protocols such as FTP, and STARTTLS. Avoid using SMTP for transmitting confidential data.
- Store passwords using strong adaptive and salted hashing functions with a work factor (delay factor), such as Argon2, yescrypt, scrypt or PBKDF2-HMAC-SHA-512. For legacy systems using bcrypt, get more advice at OWASP Cheat Sheet: Password Storage
- Initialization vectors must be chosen appropriate for the mode of operation. This could mean using a CSPRNG (cryptographically secure pseudo random number generator). For modes that require a nonce, the initialization vector (IV) does not need a CSPRNG. In all cases, the IV should never be used twice for a fixed key.
- Always use authenticated encryption instead of just encryption.
- Keys should be generated cryptographically randomly and stored in memory as byte arrays. If a password is used, then it must be converted to a key via an appropriate password base key derivation function.
- Ensure that cryptographic randomness is used where appropriate and that it has not been seeded in a predictable way or with low entropy. Most modern APIs do not require the developer to seed the CSPRNG to be secure.
- Avoid deprecated cryptographic functions, block building methods and padding schemes, such as MD5, SHA1, Cipher Block Chaining Mode (CBC), PKCS number 1 v1.5.
- Ensure settings and configurations meet security requirements by having them reviewed by security specialists, tools designed for this purpose, or both.
- You need to prepare now for post quantum cryptography (PQC), see reference (ENISA) so that high risk systems are safe no later than the end of 2030.

##### Example attack scenarios
**Scenario #1:** A site doesn't use or enforce TLS for all pages or supports weak encryption. An attacker monitors network traffic (e.g., at an insecure wireless network), downgrades connections from HTTPS to HTTP, intercepts requests, and steals the user's session cookie. The attacker then replays this cookie and hijacks the user's (authenticated) session, accessing or modifying the user's private data. Instead of the above they could alter all transported data, e.g., the recipient of a money transfer.

**Scenario #2:** The password database uses unsalted or simple hashes to store everyone's passwords. A file upload flaw allows an attacker to retrieve the password database. All the unsalted hashes can be exposed with a rainbow table of pre-calculated hashes. Hashes generated by simple or fast hash functions may be cracked by GPUs, even if they were salted.

#### A05:2025 INJECTION

##### Background
Injection falls two spots from #3 to #5 in the ranking, maintaining its position relative to A04:2025-Cryptographic Failures and A06:2025-Insecure Design. Injection is one of the most tested categories with 100% of applications tested for some form of injection. It had the greatest number of CVEs for any category, with 37 CWEs in this category. Injection includes Cross-site Scripting (high frequency/low impact) with more than 30k CVEs and SQL Injection (low frequency/high impact) with more than 14k CVEs. The massive number of reported CVEs for CWE-79 Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') brings down the average weighted impact of this category.

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 37 | 13.77% | 3.08% | 100.00% | 42.93% | 7.15 | 4.32 | 1,404,249 | 62,445 |

##### Description
An injection vulnerability is an application flaw that allows untrusted user input to be sent to an interpreter (e.g. a browser, database, the command line) and causes the interpreter to execute parts of that input as commands.

An application is vulnerable to attack when:

- User-supplied data is not validated, filtered, or sanitized by the application.
- Dynamic queries or non-parameterized calls without context-aware escaping are used directly in the interpreter.
- Unsanitized data is used within object-relational mapping (ORM) search parameters to extract additional, sensitive records.
- Potentially hostile data is directly used or concatenated. The SQL or command contains the structure and malicious data in dynamic queries, commands, or stored procedures.

Some of the more common injections are SQL, NoSQL, OS command, Object Relational Mapping (ORM), LDAP, and Expression Language (EL) or Object Graph Navigation Library (OGNL) injection. The concept is identical among all interpreters. Detection is best achieved by a combination of source code review along with automated testing (including fuzzing) of all parameters, headers, URL, cookies, JSON, SOAP, and XML data inputs. The addition of static (SAST), dynamic (DAST), and interactive (IAST) application security testing tools into the CI/CD pipeline can also be helpful to identify injection flaws before production deployment.

A related class of injection vulnerabilities has become common in LLMs. These are discussed separately in the OWASP LLM Top 10, specifically LLM01:2025 Prompt Injection.

##### How to prevent
The best means to prevent injection requires keeping data separate from commands and queries:

- The preferred option is to use a safe API, which avoids using the interpreter entirely, provides a parameterized interface, or migrates to Object Relational Mapping Tools (ORMs). Note: Even when parameterized, stored procedures can still introduce SQL injection if PL/SQL or T-SQL concatenates queries and data or executes hostile data with EXECUTE IMMEDIATE or exec().

When it is not possible to separate the data from commands, you can reduce threats using the following techniques.

- Use positive server-side input validation. This is not a complete defense as many applications require special characters, such as text areas or APIs for mobile applications.
- For any residual dynamic queries, escape special characters using the specific escape syntax for that interpreter. Note: SQL structures such as table names, column names, and so on cannot be escaped, and thus user-supplied structure names are dangerous. This is a common issue in report-writing software.

Warning these techniques involve parsing and escaping complex strings, making them error-prone and not robust in the face of minor changes to the underlying system.

##### Example attack scenarios
**Scenario #1:** An application uses untrusted data in the construction of the following vulnerable SQL call:

```
String query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";
```
An attacker modifies the 'id' parameter value in their browser to send: ' OR '1'='1. For example:
```
http://example.com/app/accountView?id=' OR '1'='1
```
This changes the meaning of the query to return all records from the accounts table. More dangerous attacks could modify or delete data or even invoke stored procedures.

**Scenario #2:** An application's blind trust in frameworks may result in queries that are still vulnerable. For example, Hibernate Query Language (HQL):
```
Query HQLQuery = session.createQuery("FROM accounts WHERE custID='" + request.getParameter("id") + "'");
```
An attacker supplies: `' OR custID IS NOT NULL OR custID='`. This bypasses the filter and returns all accounts. While HQL has fewer dangerous functions than raw SQL, it still allows unauthorized data access when user input is concatenated into queries.

**Scenario #3:** An application passes user input directly to an OS command:

```
String cmd = "nslookup " + request.getParameter("domain");
Runtime.getRuntime().exec(cmd);
```
An attacker supplies `example.com; cat /etc/passwd` to execute arbitrary commands on the server.

#### A06:2025 INSECURE DESIGN

##### Background
Insecure Design slides two spots from #4 to #6 in the ranking as A02:2025-Security Misconfiguration and A03:2025-Software Supply Chain Failures leapfrog it. This category was introduced in 2021, and we have seen noticeable improvements in the industry related to threat modeling and a greater emphasis on secure design. This category focuses on risks related to design and architectural flaws, with a call for more use of threat modeling, secure design patterns, and reference architectures. This includes flaws in the business logic of an application, e.g. the lack of defining unwanted or unexpected state changes inside an application. As a community, we need to move beyond "shift-left" in the coding space, to pre-code activities such as requirements writing and application design, that are critical for the principles of Secure by Design (e.g. see Establish a Modern AppSec Program: Planning and Design Phase). Notable Common Weakness Enumerations (CWEs) include CWE-256: Unprotected Storage of Credentials, CWE-269 Improper Privilege Management, CWE-434 Unrestricted Upload of File with Dangerous Type, CWE-501: Trust Boundary Violation, and CWE-522: Insufficiently Protected Credentials.

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 39 | 22.18% | 1.86% | 88.76% | 35.18% | 6.96 | 4.05 | 729,882 | 7,647 |

##### Description
Insecure design is a broad category representing different weaknesses, expressed as “missing or ineffective control design.” Insecure design is not the source for all other Top Ten risk categories. Note that there is a difference between insecure design and insecure implementation. We differentiate between design flaws and implementation defects for a reason, they have different root causes, take place at different times in the development process, and have different remediations. A secure design can still have implementation defects leading to vulnerabilities that may be exploited. An insecure design cannot be fixed by a perfect implementation as needed security controls were never created to defend against specific attacks. One of the factors that contributes to insecure design is the lack of business risk profiling inherent in the software or system being developed, and thus the failure to determine what level of security design is required.

Three key parts of having a secure design are:

- Gathering Requirements and Resource Management
- Creating a Secure Design
- Having a Secure Development Lifecycle

**Requirements and Resource Management**

Collect and negotiate the business requirements for an application with the business, including the protection requirements concerning confidentiality, integrity, availability, and authenticity of all data assets and the expected business logic. Take into account how exposed your application will be and if you need segregation of tenants (beyond those needed for access control). Compile the technical requirements, including functional and non-functional security requirements. Plan and negotiate the budget covering all design, build, testing, and operation, including security activities.

**Secure Design**

Secure design is a culture and methodology that constantly evaluates threats and ensures that code is robustly designed and tested to prevent known attack methods. Threat modeling should be integrated into refinement sessions (or similar activities); look for changes in data flows and access control or other security controls. In the user story development, determine the correct flow and failure states, ensure they are well understood and agreed upon by the responsible and impacted parties. Analyze assumptions and conditions for expected and failure flows to ensure they remain accurate and desirable. Determine how to validate the assumptions and enforce conditions needed for proper behaviors. Ensure the results are documented in the user story. Learn from mistakes and offer positive incentives to promote improvements. Secure design is neither an add-on nor a tool that you can add to software.

**Secure Development Lifecycle**

Secure software requires a secure development lifecycle, a secure design pattern, a paved road methodology, a secure component library, appropriate tooling, threat modeling, and incident post-mortems that are used to improve the process. Reach out to your security specialists at the beginning of a software project, throughout the project, and for ongoing software maintenance. Consider leveraging the OWASP Software Assurance Maturity Model (SAMM) to help structure your secure software development efforts.

Often self-responsibility of developers is underappreciated. Foster a culture of awareness, responsibility and proactive risk mitigation. Regular exchanges about security (e.g. during threat modeling sessions) can generate a mindset for including security in all important design decisions.

##### How to prevent
- Establish and use a secure development lifecycle with AppSec professionals to help evaluate and design security and privacy-related controls
- Establish and use a library of secure design patterns or paved-road components
- Use threat modeling for critical parts of the application such as authentication, access control, business logic, and key flows
- User threat modeling as an educational tool to generate a security mindset
- Integrate security language and controls into user stories
- Integrate plausibility checks at each tier of your application (from frontend to backend)
- Write unit and integration tests to validate that all critical flows are resistant to the threat model. Compile use-cases and misuse-cases for each tier of your application.
- Segregate tier layers on the system and network layers, depending on the exposure and protection needs
- Segregate tenants robustly by design throughout all tiers

##### Example attack scenarios
**Scenario #1:** A credential recovery workflow might include “questions and answers,” which is prohibited by NIST 800-63b, the OWASP ASVS, and the OWASP Top 10. Questions and answers cannot be trusted as evidence of identity, as more than one person can know the answers. Such functionality should be removed and replaced with a more secure design.

**Scenario #2:** A cinema chain allows group booking discounts and has a maximum of fifteen attendees before requiring a deposit. Attackers could threat model this flow and test if they can find an attack vector in the business logic of the application, e.g. booking six hundred seats and all cinemas at once in a few requests, causing a massive loss of income.

**Scenario #3:** A retail chain's e-commerce website does not have protection against bots run by scalpers buying high-end video cards to resell on auction websites. This creates terrible publicity for the video card makers and retail chain owners, and enduring bad blood with enthusiasts who cannot obtain these cards at any price. Careful anti-bot design and domain logic rules, such as purchases made within a few seconds of availability, might identify inauthentic purchases and reject such transactions.

#### A07:2025 AUTHENTICATION FAILURES

##### Background
Authentication Failures maintains its position at #7 with a slight name change to more accurately reflect the 36 CWEs in this category. Despite benefits from standardized frameworks, this category has kept its #7 rank from 2021. Notable CWEs included are CWE-259 Use of Hard-coded Password, CWE-297: Improper Validation of Certificate with Host Mismatch, CWE-287: Improper Authentication, CWE-384: Session Fixation, and CWE-798 Use of Hard-coded Credentials.

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 36 | 15.80% | 2.92% | 100.00% | 37.14% | 7.69 | 4.44 | 1,120,673 | 7,147 |

##### Description
When an attacker is able to trick a system into recognizing an invalid or incorrect user as legitimate, this vulnerability is present. There may be authentication weaknesses if the application:

- Permits automated attacks such as credential stuffing, where the attacker has a breached list of valid usernames and passwords. More recently this type of attack has been expanded to include hybrid password attacks credential stuffing (also known as password spray attacks), where the attacker uses variations or increments of spilled credentials to gain access, for instance trying Password1!, Password2!, Password3! and so on.
- Permits brute force or other automated, scripted attacks that are not quickly blocked.
- Permits default, weak, or well-known passwords, such as "Password1" or "admin" username with an "admin" password.
- Allows users to create new accounts with already known-breached credentials.
- Allows use of weak or ineffective credential recovery and forgot-password processes, such as "knowledge-based answers," which cannot be made safe.
- Uses plain text, encrypted, or weakly hashed passwords data stores (see A04:2025-Cryptographic Failures).
- Has missing or ineffective multi-factor authentication.
- Allows use of weak or ineffective fallbacks if multi-factor authentication is not available.
- Exposes session identifier in the URL, a hidden field, or another insecure location that is accessible to the client.
- Reuses the same session identifier after successful login.
- Does not correctly invalidate user sessions or authentication tokens (mainly single sign-on (SSO) tokens) during logout or a period of inactivity.
- Does not correctly assert the scope and intended audience of the provided credentials.

##### How to prevent
- Where possible, implement and enforce use of multi-factor authentication to prevent automated credential stuffing, brute force, and stolen credential reuse attacks.
- Where possible, encourage and enable the use of password managers, to help users make better choices.
- Do not ship or deploy with any default credentials, particularly for admin users.
- Implement weak password checks, such as testing new or changed passwords against the top 10,000 worst passwords list.
- During new account creation and password changes validate against lists of known breached credentials (e.g., using haveibeenpwned.com).
- Align password length, complexity, and rotation policies with National Institute of Standards and Technology (NIST) 800-63b's guidelines in section 5.1.1 for Memorized Secrets or other modern, evidence-based password policies.
- Do not force human beings to rotate passwords unless you suspect breach. If you suspect breach, force password resets immediately.
- Ensure registration, credential recovery, and API pathways are hardened against account enumeration attacks by using the same messages for all outcomes ("Invalid username or password.").
- Limit or increasingly delay failed login attempts but be careful not to create a denial of service scenario. Log all failures and alert administrators when credential stuffing, brute force, or other attacks are detected or suspected.
- Use a server-side, secure, built-in session manager that generates a new random session ID with high entropy after login. Session identifiers should not be in the URL, be securely stored in a secure cookie, and invalidated after logout, idle, and absolute timeouts.
- Ideally, use a premade, well-trusted system to handle authentication, identity, and session management. Transfer this risk whenever possible by buying and utilizing a hardened and well tested system.
- Verify the intended use of provided credentials, e.g., for JWTs validate aud, iss claims and scopes

##### Example attack scenarios
**Scenario #1:** Credential stuffing, the use of lists of known username and password combinations, is now a very common attack. More recently attackers have been found to 'increment' or otherwise adjust passwords, based on common human behavior. For instance, changing 'Winter2025' to 'Winter2026', or 'ILoveMyDog6' to 'ILoveMyDog7' or 'ILoveMyDog5'. This adjusting of password attempts is called a hybrid credential stuffing attack or a password spray attack, and they can be even more effective than the traditional version. If an application does not implement defences against automated threats (brute force, scripts, or bots) or credential stuffing, the application can be used as a password oracle to determine if the credentials are valid and gain unauthorized access.

**Scenario #2:** Most successful authentication attacks occur due to the continued use of passwords as the sole authentication factor. Once considered best practices, password rotation and complexity requirements encourage users to both reuse passwords and use weak passwords. Organizations are recommended to stop these practices per NIST 800-63 and to enforce use of multi-factor authentication on all important systems.

**Scenario #3:** Application session timeouts aren't implemented correctly. A user uses a public computer to access an application and instead of selecting "logout," the user simply closes the browser tab and walks away. Another Example for this is, if a Single Sign on (SSO) session can not be closed by a Single Logout (SLO). That is, a single login logs you into, for example, your mail reader, your document system, and your chat system. But logging out happens only to the current system. If an attacker uses the same browser after the victim thinks they have successfully logged out, but with the user still authenticated to some of the applications, then can access the victim's account. The same issue can happen in offices and enterprises when a sensitive application has not been properly exited and a colleague has (temporary) access to the unlocked computer.

#### A08:2025 SOFTWARE OR DATA INTEGRITY FAILURES

##### Background
Software or Data Integrity Failures continues at #8, with a slight, clarifying name change from "Software and Data Integrity Failures". This category is focused on the failure to maintain trust boundaries and verify the integrity of software, code, and data artifacts at a lower level than Software Supply Chain Failures. This category focuses on making assumptions related to software updates and critical data, without verifying integrity. Notable Common Weakness Enumerations (CWEs) include CWE-829: Inclusion of Functionality from Untrusted Control Sphere, CWE-915: Improperly Controlled Modification of Dynamically-Determined Object Attributes, and CWE-502: Deserialization of Untrusted Data.

##### Score table

| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 14 | 8.98% | 2.75% | 78.52% | 45.49% | 7.11 | 4.79 | 501,327 | 3,331 |

##### Description
Software and data integrity failures relate to code and infrastructure that does not protect against invalid or untrusted code or data being treated as trusted and valid. An example of this is where an application relies upon plugins, libraries, or modules from untrusted sources, repositories, and content delivery networks (CDNs). An insecure CI/CD pipeline without consuming and providing software integrity checks can introduce the potential for unauthorized access, insecure or malicious code, or system compromise. Another example of this is a CI/CD that pulls code or artifacts from untrusted places and/or doesn't verify them before use (by checking the signature or similar mechanism). Lastly, many applications now include auto-update functionality, where updates are downloaded without sufficient integrity verification and applied to the previously trusted application. Attackers could potentially upload their own updates to be distributed and run on all installations. Another example is where objects or data are encoded or serialized into a structure that an attacker can see and modify is vulnerable to insecure deserialization.

##### How to prevent
- Use digital signatures or similar mechanisms to verify the software or data is from the expected source and has not been altered.
- Ensure libraries and dependencies, such as npm or Maven, are only consuming trusted repositories. If you have a higher risk profile, consider hosting an internal known-good repository that's vetted.
- Ensure that there is a review process for code and configuration changes to minimize the chance that malicious code or configuration could be introduced into your software pipeline.
- Ensure that your CI/CD pipeline has proper segregation, configuration, and access control to ensure the integrity of the code flowing through the build and deploy processes.
- Ensure that unsigned or unencrypted serialized data is not received from untrusted clients and subsequently used without some form of integrity check or digital signature to detect tampering or replay of the serialized data.

##### Example attack scenarios
**Scenario #1 - Inclusion of Web Functionality from an Untrusted Source:** A company uses an external service provider to provide support functionality. For convenience, it has a DNS mapping for myCompany.SupportProvider.com to support.myCompany.com. This means that all cookies, including authentication cookies, set on the myCompany.com domain will now be sent to the support provider. Anyone with access to the support provider's infrastructure can steal the cookies of all of your users that have visited support.myCompany.com and perform a session hijacking attack.

**Scenario #2 - Update without signing:** Many home routers, set-top boxes, device firmware, and others do not verify updates via signed firmware. Unsigned firmware is a growing target for attackers and is expected to only get worse. This is a major concern as many times there is no mechanism to remediate other than to fix in a future version and wait for previous versions to age out.

**Scenario #3 - Use of Package from an Untrusted Source:** A developer has trouble finding the updated version of a package they are looking for, so they download it not from the regular, trusted package manager, but from a website online. The package is not signed, and thus there is no opportunity to ensure integrity. The package includes malicious code.

**Scenario #4 - Insecure Deserialization:** A React application calls a set of Spring Boot microservices. Being functional programmers, they tried to ensure that their code is immutable. The solution they came up with is serializing the user state and passing it back and forth with each request. An attacker notices the "rO0" Java object signature (in base64) and uses the Java Deserialization Scanner to gain remote code execution on the application server.

#### A09:2025 SECURITY LOGGING & ALERTING FAILURES

##### Background
Security Logging & Alerting Failures retains its position at #9. This category has a slight name change to emphasize the alerting function needed to induce action on relevant logging events. This category will always be underrepresented in the data, and for the third time voted into a position in the list from the community survey participants. This category is incredibly difficult to test for, and has minimal representation in the CVE/CVSS data (only 723 CVEs); but can be very impactful for visibility and incident alerting and forensics. This category includes issues with properly handling output encoding to log files (CWE-117), inserting sensitive data into log files (CWE-532), and insufficient logging (CWE-778).

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 5 | 11.33% | 3.91% | 85.96% | 46.48% | 7.19 | 2.65 | 260,288 | 723 |

##### Description
Without logging and monitoring, attacks and breaches cannot be detected, and without alerting it is very difficult to respond quickly and effectively during a security incident. Insufficient logging, continuous monitoring, detection, and alerting to initiate active responses occurs any time:

- Auditable events, such as logins, failed logins, and high-value transactions, are not logged or logged inconsistently (for instance, only logging successful logins, but not failed attempts).
- Warnings and errors generate no, inadequate, or unclear log messages.
- The integrity of logs is not properly protected from tampering.
- Logs of applications and APIs are not monitored for suspicious activity.
- Logs are only stored locally, and not properly backedup.
- Appropriate alerting thresholds and response escalation processes are not in place or effective. Alerts are not received or reviewed within a reasonable amount of time.
- Penetration testing and scans by dynamic application security testing (DAST) tools (such as Burp or ZAP) do not trigger alerts.
- The application cannot detect, escalate, or alert for active attacks in real-time or near real-time.
- You are vulnerable to sensitive information leakage by making logging and alerting events visible to a user or an attacker (see A01:2025-Broken Access Control), or by logging sensitive information that should not be logged (such as PII or PHI).
- You are vulnerable to injections or attacks on the logging or monitoring systems if log data is not correctly encoded.
- The application is missing or mishandling errors and other exceptional conditions, such that the system is unaware there was an error, and is therefore unable to log there was a problem.
- Adequate 'use cases' for issuing alerts are missing or outdated to recognize a special situation.
- Too many false positive alerts make it impossible to distinguish important alerts from unimportant ones, resulting in them being recognized too late or not at all (physical overload of the SOC team).
- Detected alerts cannot be processed correctly because the playbook for the use case is incomplete, out of date, or missing.

##### How to prevent
Developers should implement some or all the following controls, depending on the risk of the application:

- Ensure all login, access control, and server-side input validation failures can be logged with sufficient user context to identify suspicious or malicious accounts and held for enough time to allow delayed forensic analysis.
- Ensure that every part of your app that contains a security control is logged, whether it succeeds or fails.
- Ensure that logs are generated in a format that log management solutions can easily consume.
- Ensure log data is encoded correctly to prevent injections or attacks on the logging or monitoring systems.
- Ensure all transactions have an audit trail with integrity controls to prevent tampering or deletion, such as append-only database tables or similar.
- Ensure all transactions that throw an error are rolled back and started over. Always fail closed.
- If your application or its users behave suspiciously, issue an alert. Create guidance for your developers on this topic so they can code against this or buy a system for this.
- DevSecOps and security teams should establish effective monitoring and alerting use cases including playbooks such that suspicious activities are detected and responded to quickly by the Security Operations Center (SOC) team.
- Add 'honeytokens' as traps for attackers into your application e.g. into the database, data, as real and/or technical user identity. As they are not used in normal business, any access generates logging data that can be alerted with nearly no false positives.
- Behavior analysis and AI support could be optionally an additional technique to support low rates of false positives for alerts.
- Establish or adopt an incident response and recovery plan, such as National Institute of Standards and Technology (NIST) 800-61r2 or later. Teach your software developers what application attacks and incidents look like, so they can report them.
- There are commercial and open-source application protection products such as the OWASP ModSecurity Core Rule Set, and open-source log correlation software, such as the Elasticsearch, Logstash, Kibana (ELK) stack, that feature custom dashboards and alerting that may help you combat these issues. There are also commercial observability tools that can help you respond to or block attacks in close to real-time.

##### Example attack scenarios
**Scenario #1:** A children's health plan provider's website operator couldn't detect a breach due to a lack of monitoring and logging. An external party informed the health plan provider that an attacker had accessed and modified thousands of sensitive health records of more than 3.5 million children. A post-incident review found that the website developers had not addressed significant vulnerabilities. As there was no logging or monitoring of the system, the data breach could have been in progress since 2013, a period of more than seven years.

**Scenario #2:** A major Indian airline had a data breach involving more than ten years' worth of personal data of millions of passengers, including passport and credit card data. The data breach occurred at a third-party cloud hosting provider, who notified the airline of the breach after some time.

**Scenario #3:** A major European airline suffered a GDPR reportable breach. The breach was reportedly caused by payment application security vulnerabilities exploited by attackers, who harvested more than 400,000 customer payment records. The airline was fined 20 million pounds as a result by the privacy regulator.

#### A10:2025 MISHANDLING OF EXCEPTIONAL CONDITIONS

##### Background
Mishandling of Exceptional Conditions is a new category for 2025. This category contains 24 CWEs and focuses on improper error handling, logical errors, failing open, and other related scenarios stemming from abnormal conditions and systems may encounter. This category has some CWEs that were previously associated with poor code quality. That was too general for us; in our opinion, this more specific category provides better guidance.

Notable CWEs included in this category: CWE-209 Generation of Error Message Containing Sensitive Information, CWE-234 Failure to Handle Missing Parameter, CWE-274 Improper Handling of Insufficient Privileges, CWE-476 NULL Pointer Dereference, and CWE-636 Not Failing Securely ('Failing Open').

##### Score table
| CWEs Mapped | Max Incidence Rate | Avg Incidence Rate | Max Coverage | Avg Coverage | Avg Weighted Exploit | Avg Weighted Impact | Total Occurrences | Total CVEs |
|-------------|-------------------|-------------------|--------------|--------------|----------------------|--------------------|--------------------|------------|
| 24 | 20.67% | 2.95% | 100.00% | 37.95% | 7.11 | 3.81 | 769,581 | 3,416 |

##### Description
Mishandling exceptional conditions in software happens when programs fail to prevent, detect, and respond to unusual and unpredictable situations, which leads to crashes, unexpected behavior, and sometimes vulnerabilities. This can involve one or more of the following 3 failings; the application doesn't prevent an unusual situation from happening, it doesn't identify the situation as it is happening, and/or it responds poorly or not at all to the situation afterwards.

Exceptional conditions can be caused by missing, poor, or incomplete input validation, or late, high level error handling instead at the functions where they occur, or unexpected environmental states such as memory, privilege, or network issues, inconsistent exception handling, or exceptions that are not handled at all, allowing the system to fall into an unknown and unpredictable state. Any time an application is unsure of its next instruction, an exceptional condition has been mishandled. Hard-to-find errors and exceptions can threaten the security of the whole application for a long time.

Many different security vulnerabilities can happen when we mishandle exceptional conditions, such as logic bugs, overflows, race conditions, fraudulent transactions, or issues with memory, state, resource, timing, authentication, and authorization. These types of vulnerabilities can negatively affect the confidentiality, availability, and/or integrity of a system or its data. Attackers manipulate an application's flawed error handling to strike this vulnerability.

##### How to prevent
In order to handle an exceptional condition properly we must plan for such situations (expect the worst). We must 'catch' every possible system error directly at the place where they occur and then handle it (which means do something meaningful to solve the problem and ensure we recover from the issue). As part of the handling, we should include throwing an error (to inform the user in an understandable way), logging of the event, as well as issuing an alert if we feel that is justified. We should also have a global exception handler in place in case there is ever something we have missed. Ideally, we would also have monitoring and/or observability tooling or functionality that watches for repeated errors or patterns that indicate an on-going attack, that could issue a response, defense, or blocking of some kind. This can help us block and respond to scripts and bots that focus on our error handling weaknesses.

Catching and handling exceptional conditions ensures that the underlying infrastructure of our programs are not left to deal with unpredictable situations. If you are part way through a transaction of any kind, it is extremely important that you roll back every part of the transaction and start again (also known as failing closed). Attempting to recover a transaction part way through is often where we create unrecoverable mistakes.

Whenever possible, add rate limiting, resource quotas, throttling, and other limits wherever possible, to prevent exceptional conditions in the first place. Nothing in information technology should be limitless, as this leads to a lack of application resilience, denial of service, successful brute force attacks, and extraordinary cloud bills. Consider whether identical repeated errors, above a certain rate, should only be outputted as statistics showing how often they have occurred and in what time frame. This information should be appended to the original message so as not to interfere with automated logging and monitoring, see A09:2025 Security Logging & Alerting Failures.

On top of this, we would want to include strict input validation (with sanitization or escaping for potentially hazardous characters that we must accept), and centralized error handling, logging, monitoring, and alerting, and a global exception handler. One application should not have multiple functions for handling exceptional conditions, it should be performed in one place, the same way each time. We should also create project security requirements for all the advice in this section, perform threat modelling and/or secure design review activities in the design phase of our projects, perform code review or static analysis, as well as execute stress, performance, and penetration testing of the final system.

If possible, your entire organization should handle exceptional conditions in the same way, as it makes it easier to review and audit code for errors in this important security control.

##### Example attack scenarios
**Scenario #1 - Resource exhaustion via mishandling of exceptional conditions (Denial of Service):** Could be caused if the application catches exceptions when files are uploaded, but doesn't properly release resources after. Each new exception leaves resources locked or otherwise unavailable, until all resources are used up.

**Scenario #2 - Sensitive data exposure via improper handling of database errors:** Reveals the full system error to the user. The attacker continues to force errors in order to use the sensitive system information to create a better SQL injection attack. The sensitive data in the user error messages are reconnaissance.

**Scenario #3 - State corruption in financial transactions:** Could be caused by an attacker interrupting a multi-step transaction via network disruptions. Imagine the transaction order was: debit user account, credit destination account, log transaction. If the system doesn't properly roll back the entire transaction (fail closed) when there is an error part way through, the attacker could potentially drain the user's account, or possibly a race condition that allows the attacker to send money to the destination multiple times.
