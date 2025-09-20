# TwinTakes.ai Development Workflow

## 🎯 **Complete Setup Overview**

### **Production Environment**
- **Live Site**: https://twintakes.ai
- **Branch**: `main`
- **Platform**: Railway
- **Database**: MongoDB Atlas (production cluster)
- **Users**: Real customers access this

### **Staging Environment** 
- **Staging Site**: https://librechat-production-ad79.up.railway.app
- **Branch**: `development` 
- **Platform**: Railway (`twintakes_staging` project)
- **Database**: MongoDB Atlas (staging cluster - FREE M0)
- **Users**: Only you for testing

## 🚀 **Development Workflow**

### **Step 1: Work on Features**
```bash
# Make sure you're on development branch
git checkout development

# Make your changes to the code
# Edit files, add features, fix bugs, etc.

# Commit your changes
git add .
git commit -m "Add new feature: [describe what you built]"
```

### **Step 2: Push to GitHub**
```bash
# Push to development branch
git push origin development
```

### **Step 3: Auto-Deploy to Staging**
- Railway automatically detects the push
- Builds and deploys to: https://librechat-production-ad79.up.railway.app
- Wait 2-3 minutes for deployment

### **Step 4: Test Your Changes**
1. **Open staging URL**: https://librechat-production-ad79.up.railway.app
2. **Test thoroughly**: Try all new features, check for bugs
3. **Verify functionality**: Make sure everything works as expected
4. **Title shows**: "TwinTakes.ai - STAGING" (confirms you're on staging)

### **Step 5: When Satisfied, Deploy to Production**
```bash
# Switch to main branch
git checkout main

# Merge development into main
git merge development

# Push to production
git push origin main
```

### **Step 6: Production Auto-Update**
- Railway production automatically detects the push to `main`
- Deploys to: https://twintakes.ai
- Your customers see the new features!

## 🛡️ **Safety Features**

### **Complete Isolation**
- ✅ **Separate databases**: Staging and production data never mix
- ✅ **Separate environments**: Testing won't affect live site
- ✅ **Branch protection**: `main` branch only gets tested code

### **Easy Rollback**
If something goes wrong:
```bash
# Quickly revert main branch
git checkout main
git reset --hard HEAD~1  # Goes back one commit
git push origin main --force
```

## 💰 **Cost Breakdown**
- **Production Railway**: Current cost (unchanged)
- **Staging Railway**: ~$5/month
- **Staging MongoDB**: FREE (M0 Sandbox)
- **Total Additional**: ~$5/month for professional staging environment

## 🔧 **Key Commands**

### **Check Current Branch**
```bash
git branch  # Shows which branch you're on
```

### **Switch Branches**
```bash
git checkout development  # Switch to development
git checkout main         # Switch to production
```

### **Check Status**
```bash
git status               # See what files changed
railway status          # See Railway connection
```

## 🌐 **URLs Reference**
- **Production**: https://twintakes.ai
- **Staging**: https://librechat-production-ad79.up.railway.app
- **Railway Dashboard**: https://railway.com/project/f55f0b88-3e9e-4876-8fc0-d717b9b5956f

## 📋 **Environment Variables**
Staging environment uses:
- Separate security keys
- Staging MongoDB database
- `APP_TITLE=TwinTakes.ai - STAGING`
- `OPENAI_API_KEY=user_provided` (users enter their own keys)

## 🎯 **Best Practices**
1. **Always test in staging first** before production
2. **Keep development branch up to date** with main
3. **Test thoroughly** before merging to main
4. **Use descriptive commit messages**
5. **Document any breaking changes**

## 🆘 **Troubleshooting**
- **Staging not updating**: Check Railway logs, verify push to development branch
- **Environment issues**: Verify variables in Railway dashboard
- **Database issues**: Check MongoDB Atlas connection strings
- **Build failures**: Check Railway deployment logs

---
*Created: September 19, 2025*
*Staging URL: https://librechat-production-ad79.up.railway.app*