# URL Shortener with SEO Metadata Management - Implementation Plan

## Problem Statement

Create a web-based URL shortener application where authenticated users can:

- Paste long URLs and receive shortened versions
- Choose custom short codes or use auto-generated ones
- View and edit SEO metadata (title, description, image) for each shortened URL
- Manage their collection of shortened URLs (view, edit, delete)
- Have shortened URLs that preserve SEO metadata when shared on platforms like Discord
- Redirect users directly to the original URL when they visit a short link
- Set expiration dates for URLs
- Preview destination before redirect (optional safety feature)

## Key Requirements

- **User Authentication**: Required for creating and managing URLs
- **URL Limits**: Maximum 50-100 URLs per user
- **URL Expiration**: Users can set optional expiration dates
- **SEO Metadata**: Extract, display, and allow editing of Open Graph/meta tags
- **Custom Short Codes**: Users can define custom codes (if available)
- **Analytics**: No tracking/analytics required
- **Password Protection**: Not required

## Workplan

### Phase 1: Core Architecture & Setup

- [x] Define technology stack (frontend, backend, database)
- [x] Set up project structure and initialize repositories
- [x] Configure development environment
- [x] Set up version control
- [x] Define database schema for users, URLs, and metadata
- [ ] Set up environment variables and configuration management

### Phase 2: Authentication System

- [ ] Design user registration flow
- [ ] Implement user login/logout functionality
- [ ] Add password hashing and security measures
- [ ] Create session/token management
- [ ] Build authentication middleware
- [ ] Add "forgot password" functionality (optional)
- [ ] Implement user profile management

### Phase 3: URL Shortening Core Features

- [ ] Design URL shortening algorithm and short code generation
- [ ] Implement custom short code validation (check availability)
- [ ] Create randomized short code generator (fallback)
- [ ] Build URL validation and sanitization
- [ ] Implement URL storage with user association
- [ ] Add URL duplication detection per user
- [ ] Enforce 50-100 URL limit per user
- [ ] Implement URL expiration logic with date tracking

### Phase 4: SEO Metadata Extraction & Management

- [ ] Build metadata scraper to extract Open Graph tags from URLs
- [ ] Extract og:title, og:description, og:image, og:url
- [ ] Handle fallback to standard meta tags if OG tags unavailable
- [ ] Create metadata storage schema
- [ ] Build metadata editor UI for users
- [ ] Implement metadata validation
- [ ] Handle image proxy/caching for og:image

### Phase 5: Frontend - URL Creation Interface

- [ ] Design and build landing/home page
- [ ] Create URL input form with validation
- [ ] Build custom short code input with availability checker
- [ ] Add expiration date picker
- [ ] Display generated short URL with copy-to-clipboard
- [ ] Show loading states during metadata extraction
- [ ] Handle error states (invalid URLs, unavailable codes)

### Phase 6: Frontend - URL Management Dashboard

- [ ] Design dashboard layout showing all user URLs
- [ ] Display URL list with: original URL, short code, creation date, expiration, click count
- [ ] Implement search/filter functionality
- [ ] Add sorting options (date, name, clicks)
- [ ] Create edit modal for each URL
- [ ] Show SEO metadata preview cards
- [ ] Build metadata editor interface
- [ ] Add delete confirmation dialog
- [ ] Implement URL deactivation (soft delete)

### Phase 7: SEO Metadata Injection System

- [ ] Build server-side rendering for short URL routes
- [ ] Inject custom Open Graph tags into HTML head
- [ ] Inject meta description, title, and image tags
- [ ] Add og:url pointing to original destination
- [ ] Test metadata rendering with Discord, Twitter, Facebook validators
- [ ] Implement caching strategy for metadata
- [ ] Handle missing or broken images gracefully

### Phase 8: URL Redirection System

- [ ] Create short URL route handler
- [ ] Implement 301/302 redirect logic to original URL
- [ ] Handle expired URL scenarios (show error page)
- [ ] Handle deleted/invalid short codes (404 page)
- [ ] Add redirect delay for preview feature (optional)
- [ ] Build "preview page" showing destination before redirect
- [ ] Add security checks (malware, phishing detection optional)

### Phase 9: User Experience Enhancements

- [ ] Design responsive UI for mobile and desktop
- [ ] Add loading spinners and progress indicators
- [ ] Implement toast notifications for actions (copy, delete, update)
- [ ] Add confirmation dialogs for destructive actions
- [ ] Create help/documentation pages
- [ ] Add keyboard shortcuts (optional)
- [ ] Implement dark mode (optional)

### Phase 10: Security & Validation

- [ ] Implement rate limiting for URL creation
- [ ] Add CSRF protection
- [ ] Sanitize all user inputs
- [ ] Validate URL formats and protocols
- [ ] Block malicious/spam domains (optional blacklist)
- [ ] Add captcha for registration/login (optional)
- [ ] Implement SQL injection prevention
- [ ] Add XSS protection headers

### Phase 11: Testing

- [ ] Write unit tests for URL shortening logic
- [ ] Test metadata extraction with various websites
- [ ] Test authentication flows
- [ ] Test URL expiration logic
- [ ] Test short code collision handling
- [ ] Perform browser compatibility testing
- [ ] Test SEO metadata injection across platforms
- [ ] Load testing for redirection performance
- [ ] Test edge cases (long URLs, special characters, unicode)

### Phase 12: Deployment & Documentation

- [ ] Set up production database
- [ ] Configure production environment variables
- [ ] Set up domain and SSL certificates
- [ ] Deploy backend services
- [ ] Deploy frontend application
- [ ] Set up monitoring and logging
- [ ] Create user documentation
- [ ] Create API documentation (if API exposed)
- [ ] Set up automated backups
- [ ] Create maintenance/runbook documentation

## Technical Considerations

### Database Schema (Conceptual)

```bash
Users:
- id (primary key)
- email (unique)
- password_hash
- created_at
- url_count (for enforcing limits)

URLs:
- id (primary key)
- user_id (foreign key)
- original_url (text)
- short_code (unique, indexed)
- created_at
- expires_at (nullable)
- is_active (boolean)
- custom_metadata (boolean, true if user edited)

Metadata:
- id (primary key)
- url_id (foreign key)
- title
- description
- image_url
- updated_at
```

### URL Shortening Algorithm

- Generate random alphanumeric codes (e.g., 6-8 characters)
- Check for collisions in database
- Allow custom codes with validation (alphanumeric, length limits)
- Use base62 encoding or UUID-based approach

### SEO Metadata Flow

1. User pastes URL → Backend fetches HTML
2. Parse HTML for Open Graph tags (og:title, og:description, og:image)
3. Fallback to standard meta tags if OG tags missing
4. Store metadata in database
5. Allow user to edit any field
6. When short URL is accessed, inject metadata into page before redirect

### Redirect Flow

1. User visits short URL (e.g., yourapp.com/abc123)
2. Server looks up short_code in database
3. Check if URL is expired or inactive
4. If valid, inject SEO metadata into HTML head
5. If preview enabled, show preview page with "Continue" button
6. Otherwise, 302 redirect to original URL immediately

## Notes & Considerations

### SEO Metadata Platform Testing

- Test with Discord's URL preview
- Test with Twitter/X card validator
- Test with Facebook's sharing debugger
- Test with LinkedIn preview
- Ensure image URLs are accessible (consider image proxy)

### Performance Optimizations

- Cache metadata for frequently accessed URLs
- Use CDN for static assets
- Optimize database queries with proper indexing
- Consider Redis for short code lookups (optional)

### Future Enhancements (Post-MVP)

- QR code generation
- Bulk URL import
- Public API for developers
- Click analytics (if requirements change)
- Team/organization accounts
- Custom domains
- URL folders/categories
- Browser extension

### Security Best Practices

- Never store plain text passwords
- Use HTTPS everywhere
- Implement rate limiting
- Validate and sanitize all inputs
- Use prepared statements for SQL queries
- Keep dependencies updated
- Regular security audits

## Success Criteria

- Users can register, login, and manage their account
- Users can create shortened URLs with custom or random codes
- SEO metadata is automatically extracted and displayed
- Users can edit metadata for their URLs
- Shortened URLs display correct metadata when shared on platforms like Discord
- Short URLs redirect correctly to original destinations
- URL expiration works as expected
- Users cannot exceed 50-100 URL limit
- Preview page works before redirect
- Application is responsive and user-friendly
